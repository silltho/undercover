class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players
  has_many :articles, dependent: :destroy
  attribute :full
  attribute :aasm_state
  attribute :players
  after_create :set_game_code
  ALWAYS_SUCCESSFUL = %w[blackmail spy shoot imprison free poison].freeze


  def full
    players.size >= 9
  end

  aasm whiny_transitions: false do
    state :waiting, initial: true
    state :initialized, :inform, :exchange, :activity, :finished

    event :initializing do
      transitions from: :waiting, to: :initialized, after: :init_game
    end

    event :started do
      transitions from: :initialized, to: :activity
    end

    event :informed do
      transitions from: :inform, to: :exchange
    end

    event :exchanged do
      transitions from: :exchange, to: :activity
    end

    event :skills_used, after: :update_round do
      transitions from: :activity, to: :inform
    end

    event :finish do
      transitions from: :inform, to: :finished
    end

    event :reset do
      transitions from: :initialized, to: :waiting
      transitions from: :inform, to: :waiting
      transitions from: :exchange, to: :waiting
      transitions from: :activity, to: :waiting
      transitions from: :finished, to: :waiting
    end

  end

  def broadcast_game_updated
    reload
    GamesChannel.broadcast_to(self, type: 'game_updated', data: get_game_object)
  end

  def broadcast_information_updated(round)
    reload
    GamesChannel.broadcast_to(self, type: 'information_updated', data: get_newspaper_object(round))
  end

  def broadcast_game_ended(data)
    reload
    GamesChannel.broadcast_to(self, type: 'game_ended', data: data)
  end

  def get_game_object
    reload
    {  id: id,
       code: code,
       aasm_state: aasm_state,
       round: round,
       players: players.to_a,
       party_distribution: get_party_members
    }
  end

  def get_newspaper_object(round)
    data = {}
    round.times do |n|
      data[n] = create_stories(n)
    end
    data
  end

  def init_game
    data = {}
    data['round'] = round
    init_players
    players.each do |player|
      player.broadcast_player_updated
    end
  end

  def init_players
    roles_array = assign_roles(players.size)
    players.each do |player|
      player.reset!
      player.reload
      player.assign_character(roles_array.delete(roles_array.sample))
      player.create_codename
      #player.get_relations
    end
  end

  def update_round
    value = self.round + 1
    update(round: value)
  end

  def get_party_members
    data = {}
    %w[Mafia Town Anarchists Prisoners Dead].each{ |k| data[k] = 0 }
    players.each do |player|
      data["Mafia"] += 1 if belongs_to_mafia(player) && player.state == "alive"
      data["Town"]+= 1 if belongs_to_town(player) && player.state == "alive"
      data["Anarchists"]+= 1 if player.role.try(:party) == "Anarchists" && player.state == "alive"
      data["Prisoners"]+= 1  if player.state == "imprisoned"
      data["Dead"]+= 1 if player.state =="dead"
    end
    data
  end

  def belongs_to_mafia(player)
    player.role.try(:party) == "Mafia" || (player.role.try(:party) == "Town" && player.role.try(:changed_party) == true)
  end

  def belongs_to_town(player)
    player.role.try(:party) == "Town" || (player.role.try(:party) == "Mafia" && player.role.try(:changed_party) == true)
  end

  def add_player(player)
    players << player
  end

  def create_game_code
    code = nil
    until unique_game_code(code) && code != nil
      code = ('0'..'9').to_a.shuffle[0,4].join
    end
    code
  end

  def set_game_code
    update(code: create_game_code)
  end

  def unique_game_code(code)
    !Game.where(code: code).where(aasm_state: 'waiting').exists?
  end

  def use_skill(committer, victim)
    create_article(committer, victim)
  end

  def create_article(committer, victim)
    success = calculate_success(committer, victim)
    Article.create(game: self, round: round, committer_id: committer, victim_id: victim, success: success)
  end

  def calculate_success(c_id, v_id)
    c = Player.find(c_id)
    v = Player.find(v_id)
    return true if ALWAYS_SUCCESSFUL.include?(c.role.active)
    check_for_change(c, v)
  end

  def check_for_change(committer, victim)
    # president can't convert godfather and vice versa
    if committer.role.passive == 'immunity' && victim.role.passive == 'immunity'
      false
    # reconverting is possible
    elsif not_same_party_anymore(committer, victim)
      true
    # members of the same party do not change party
    elsif same_party(committer, victim)
      false
    # if not case applies, converting is possible
    else
      true
    end
  end

  def same_party(committer, victim)
    committer.role.party == victim.role.party
  end

  def not_same_party_anymore(committer, victim)
    committer.role.party == victim.role.party && committer.changed_party != victim.changed_party
  end

  # actions are applied to successful happenings
  def apply_action(committer, victim)
    action = committer.role.active
    die = %w[shoot poison]
    imprison = 'imprison'
    release = 'free'
    reveal = %w[blackmail spy]
    change = %w[corrupt convert]
    victim.die! if die.include?(action)
    victim.imprison! if imprison.include?(action)
    victim.release! if release.include?(action)
    committer.broadcast_spy_action(victim) if reveal.include?(action)
    victim.change_party! if change.include?(action)
    victim.broadcast_player_updated
  end

  def create_stories(round)
    newspaper = []
    get_latest_news(round).each do |article|
      role = Player.find(article.committer_id).role
      newspaper << write_success_story(role, article.committer, article.victim) if article.success
      newspaper << write_fail_story(role) unless article.success
    end
    newspaper << avoid_empty_newspaper(newspaper)
    newspaper
  end

  def get_latest_news(round)
    ids = Article.where(game: self).where(round: round).group(:committer).maximum(:id).values
    Article.where(id: ids)
  end

  def avoid_empty_newspaper(newspaper)
    'Nothing happened that night.' if newspaper.empty?
  end

  def write_success_story(role, committer, victim)
    apply_action(committer, victim)
    role.try(:text_success)
  end

  def write_fail_story(role)
    role.try(:text_fail)
  end

  def is_game_over?
    statistic = get_party_members
    if both_heads_dead? || statistic["Mafia"].zero? || statistic["Town"].zero?
      get_winner
      true
    else
      false
    end
  end


  def get_winner
    statistic = get_party_members
    broadcast_game_ended(-"Junior won.") if both_heads_dead?
    broadcast_game_ended(-"Town won.") if statistic["Mafia"].zero?
    broadcast_game_ended(-"Mafia won.") if statistic["Town"].zero?
  end

  def both_heads_dead?
    gf = Player.where(game: self).where(role: Role.where(name: "Godfather")).first
    pr = Player.where(game: self).where(role: Role.where(name: "President")).first
    ju = Player.where(game: self).where(role: Role.where(name: "Junior")).first
    true if gf.state != "alive" && pr.state != "alive" && jr.state == "alive"
    false
  end
end

