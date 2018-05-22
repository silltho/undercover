class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players, dependent: :delete_all
  has_many :articles, dependent: :delete_all
  has_many :action_logs, dependent: :delete_all
  after_create :set_game_code
  ALWAYS_SUCCESSFUL = %w[blackmail spy shoot poison].freeze
  TOWN = 'Town'
  MAFIA = 'Mafia'
  ANARCHISTS = 'Anarchists'

  #### STATE MACHINE ####
  aasm whiny_transitions: false do
    state :waiting, initial: true
    state :initialized, :inform, :activity, :finished

    event :initializing do
      transitions from: :waiting, to: :initialized, after: :init_game
    end

    event :started do
      transitions from: :initialized, to: :activity
    end

    event :informed do
      transitions from: :inform, to: :activity
    end

    # event :exchanged do
    #   transitions from: :exchange, to: :activity
    # end

    event :skills_used, after: :update_round do
      transitions from: :activity, to: :inform
    end

    event :finish do
      transitions from: :inform, to: :finished
    end

    event :next_state do
      transitions from: :initialized, to: :activity
      transitions from: :inform, to: :activity
      transitions from: :activity, to: :inform, after: :update_round
    end

    event :reset do
      transitions from: :initialized, to: :waiting
      transitions from: :inform, to: :waiting
      transitions from: :activity, to: :waiting
      transitions from: :finished, to: :waiting
    end
  end

  #### BROADCASTS ####

  def broadcast_game_updated
    reload
    GamesChannel.broadcast_to(self, type: 'game_updated', data: get_game_object)
  end

  def broadcast_information_updated(last_round)
    reload
    GamesChannel.broadcast_to(self, type: 'information_updated', data: get_newspaper_object)
  end

  def broadcast_game_ended(data)
    reload
    GamesChannel.broadcast_to(self, type: 'game_ended', data: data)
  end

  def broadcast_all_players
    players.each do |players|
      players.broadcast_player_updated
    end
  end

  def time_is_up
    self.next_state!
    broadcast_information_updated(round) if aasm_state == 'inform'
    broadcast_game_updated
  end

  #### INITIALIZING ####

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
    end
    players.each(&:get_relations)
  end

  def add_player(player)
    if Player.where(user: player.user, game: self).count > 1
      p = Player.where(user_id: player.user.id, game: self)
      players.delete(p)
      p.destroy
    else
      players << player
    end
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
    !Game.where(code: code).exists?
  end

  #### BUILDING OBJECTS ####

  def get_game_object
    reload
    {  id: id,
       code: code,
       aasm_state: aasm_state,
       round: round,
       players: players,
       party_distribution: get_party_members
    }
  end

  def get_newspaper_object
    {
      round => {
                  party_distribution: get_party_members,
                  infos: create_stories(round - 1)
               }
    }
  end

  def get_party_members
    data = {}
    %w[Mafia Town Anarchists Prisoners Dead].each{ |k| data[k] = 0 }
    players.each do |player|
      data[MAFIA] += 1 if belongs_to_mafia(player) && player.state == "alive"
      data[TOWN]+= 1 if belongs_to_town(player) && player.state == "alive"
      data[ANARCHISTS]+= 1 if belongs_to_anarchists(player) && player.state == "alive"
      data["Prisoners"]+= 1  if player.state == "imprisoned"
      data["Dead"]+= 1 if player.state =="dead"
    end
    data
  end

  def get_endscreen_object(party)
    data = Hash.new{|hsh,key| hsh[key] = [] }
    data['winner'] = [{party: party}]
    players.each do |player|
      player_object = {id: player.id, codename: player.codename, role: player.role.name, state: player.state}
      data[MAFIA] <<  player_object if belongs_to_mafia(player)
      data[TOWN] << player_object if belongs_to_town(player)
      data[ANARCHISTS] << player_object if belongs_to_anarchists(player)
    end
    data
  end

  #### HELPERS ####

  def full?
    players.size == 13
  end

  def can_be_started?
    players.size >= 9
  end

  def update_round
    update(round: round + 1 )
  end

  #### BOOLEAN CHECKS ####

  def belongs_to_mafia(player)
    (player.role.try(:party) == MAFIA && player.try(:changed_party) == false) || (player.role.try(:party) == TOWN && player.try(:changed_party) == true)
  end

  def belongs_to_town(player)
    (player.role.try(:party) == TOWN && player.try(:changed_party) == false) || (player.role.try(:party) == MAFIA && player.try(:changed_party) == true)
  end

  def belongs_to_anarchists(player)
    player.role.try(:party) == ANARCHISTS
  end

  def check_for_prisoners(victim)
    victim.imprisoned?
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

  def all_users_clicked?(round)
    players.alive.count == Article.where(game: self).where(round: round).group(:committer).maximum(:id).count
  end

  def is_game_over?
    statistic = get_party_members
    if both_heads_dead? || statistic[MAFIA].zero? || statistic[TOWN].zero?
      get_winner
      true
    else
      false
    end
  end

  def both_heads_dead?
    gf = Player.where(game: self).where(role: Role.where(name: "Godfather")).pluck(:state).first
    pr = Player.where(game: self).where(role: Role.where(name: "President")).pluck(:state).first
    jr = Player.where(game: self).where(role: Role.where(name: "Junior")).pluck(:state).first
    return true if gf != "alive" && pr != "alive" && jr == "alive"
    false
  end

  #### ACTIVITY STACK ####

  def use_skill(committer, victim)
    create_article(committer, victim)
  end

  def calculate_success(c_id, v_id)
    c = Player.find(c_id)
    v = Player.find(v_id)
    return true if ALWAYS_SUCCESSFUL.include?(c.role.active)
    return check_for_prisoners(v) if c.role.active == "free"
    return !check_for_prisoners(v) if c.role.active == "imprison"
    check_for_change(c, v)
  end

  # actions are applied to successful happenings
  def apply_action(committer, victim)
    action = committer.role.active
    die = %w[shoot poison]
    imprison = 'imprison'
    release = 'free'
    reveal = %w[blackmail spy]
    change = %w[corrupt convert]
    puts "#{committer} used spy or blackmail action to #{victim}" if reveal.include?(action)
    committer.broadcast_spy_action(victim) if reveal.include?(action)
    victim.imprison! if imprison.include?(action)
    victim.release! if release.include?(action)
    victim.die! if die.include?(action)
    victim.change_party! if change.include?(action)
    # victim.broadcast_player_updated
  end

  #### NEWSPAPER AND STUFF ####

  def create_article(committer, victim)
    success = victim.nil? ? false : calculate_success(committer, victim)
    Article.create(game: self, round: round, committer_id: committer, victim_id: victim, success: success)
  end

  def create_stories(last_round)
    newspaper = []
    get_latest_news(last_round).each do |article|
      role = Player.find(article.committer_id).role
      newspaper << write_success_story(role, article.committer, article.victim, last_round) if article.success
      newspaper << write_fail_story(role) if !article.victim.nil? && !article.success
    end
    newspaper << avoid_empty_newspaper(newspaper)
    newspaper.compact
  end

  def get_latest_news(last_round)
    ids = Article.where(game: self).where(round: last_round).group(:committer).maximum(:id).values
    Article.where(id: ids)
  end

  def avoid_empty_newspaper(newspaper)
    {role: nil, info_text: 'Nothing happened that night.'} if newspaper.empty?
  end

  def write_success_story(role, committer, victim, round_nr)
    apply_action(committer, victim) if self.round - 1 == round_nr
    { role: role.name, info_text: generate_success_text(role, victim) }
  end

  # needs refactoring
  def generate_success_text(role, victim)
    return "A criminal has been persuaded to join the townsmen." if role.name == 'President'
    return "Threatened by a criminal, a player revealed its role." if role.name == 'Bodyguard'
    return "R.I.P. #{victim.codename} (#{victim.role.name}) lies dead on the street." if role.name == 'Enforcer'
    return "Sneaky, sneaky. A prisoner is freed." if role.name == 'Beagle Boy'
    return "Corruption! Money changed somebody’s mind." if role.name == 'Godfather'
    return "Caught by the police, #{victim.codename} has been jailed" if role.name == 'Chief' || role.name == "Officer"
    return "Espionage has been carried out." if role.name == 'Agent'
    "Rats! #{victim.codename} (#{victim.role.name}) has been deadly poisoned by the anarchist. " if role.name == 'Junior'
  end

  def write_fail_story(role)
    { role: role.name, info_text: role.try(:text_fail) }
  end

  #### END GAME ####

  def get_winner
    statistic = get_party_members
    winner = if both_heads_dead?
               ANARCHISTS
             elsif statistic[MAFIA].zero?
               TOWN
             elsif statistic[TOWN].zero?
               MAFIA
             end
    data = get_endscreen_object(winner)
    broadcast_game_ended(data)
    send_info_to_player(winner)
    winner
  end

  def send_info_to_player(winner)
    players.each do |player|
      if (winner == MAFIA && belongs_to_mafia(player)) || (winner == TOWN && belongs_to_town(player)) || winner == ANARCHISTS && belongs_to_anarchists(player)
        player.broadcast_you_won
      else
        player.broadcast_you_lost
      end
    end
  end
end

