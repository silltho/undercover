class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players
  has_many :articles, dependent: :destroy
  attribute :full
  attribute :aasm_state
  attribute :players
  after_create :set_game_code

  def full
    players.size >= 9
  end

    aasm whiny_transitions: false do
    state :waiting, initial: true
    state :initialized, :inform, :exchange, :activity, :finished
    after_all_transitions :log_status_change

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

    event :skills_used do
      transitions from: :activity, to: :inform, after: :update_round
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

  def get_game_object
     {  id: id,
        code: code,
        aasm_state: aasm_state,
        round: round,
        players: players.to_a,
        party_distribution: get_party_members
     }
  end

  def log_status_change
    puts "Game with code #{self.code}' changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def init_game
    data = {}
    reload
    data['round'] = round
    init_players
    players.each do |player|
      data['current_player'] = player
      data['role_details'] = player.role
      UserChannel.broadcast_to(player, type: 'player_initialized_game', data: data)
    end
  end

  def init_players
    roles_array = assign_roles(players.size)
    players.each do |player|
      player.assign_character(roles_array.delete(roles_array.sample))
      player.create_codename
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

  def use_skill(victim)
    Article.create(game: current_user.game, round: current_user.game.round, committer: self, victim: victim, success: true)
    puts "#{current_user} used #{current_user.active} on #{victim}"
  end

end
