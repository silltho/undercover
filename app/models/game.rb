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
      transitions from: :initialized, to: :inform
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
    %w[Mafia Town Anarchists].each{ |k| data[k] = 0 }
    players.each do |player|
      data["Mafia"] += 1 if player.role.try(:party) == "Mafia"
      data["Town"]+= 1 if player.role.try(:party) == "Town"
      data["Anarchists"]+= 1 if player.role.try(:party) == "Anarchists"
    end
    data
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
    check_immunity_roles(c, v)
  end

  def check_immunity_roles(committer, victim)
    if committer.role.party == victim.role.party
      false
    elsif committer.role.passive == 'immunity' || victim.role.passive == 'immunity'
      false
    else
      true
    end
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
    victim.reveal_identity(committer) if reveal.include?(action)
    victim.change_party if change.include?(action)
    victim.broadcast_player_updated
  end

=begin
  def calculate_success(c_id, v_id)
    committer = Player.find(c_id)
    committer_role = committer.try(:role).try(:name)
    victim = Player.find(v_id)
    victim_role = victim.try(:role).try(:name)
    if (committer_role == "Godfather" && victim_role == "President") || (committer_role == "President" && victim_role == "Godfather")
      false
    elsif (committer_role == "Godfather" && victim_role == "Junior") || (committer_role == "President" && victim_role == "Junior")
      false
    elsif committer_role == "Junior" || committer_role == "Enforcer"
      victim.die!
      true
    elsif committer_role == "President" || committer_role == "Godfather"
      if victim.role.party == committer.role.party
        false
      else
        victim.change_party
        victim.reload
        true
      end
    elsif committer_role == "Chief" || committer_role == "Officer"
      victim.imprison!
      true
    elsif committer_role == "Bodyguard" || committer_role == "Agent"
      victim.reveal_identity(committer)
      true
    elsif committer_role == "Beagle Boy"
      victim.release!
      true
    else
      true
    end
  end
=end

  
  def create_stories(round)
    newspaper = []
    Article.where(game: self).where(round: round).each do |article|
      role = Player.find(article.committer_id).role
      newspaper << write_success_story(role, article.committer, article.victim) if article.success
      newspaper << write_fail_story(role) unless article.success
    end
    newspaper << avoid_empty_newspaper(newspaper)
    newspaper
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
end

