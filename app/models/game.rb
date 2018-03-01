class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players, class_name: 'Player', dependent: :destroy
  attribute :full
  attribute :aasm_state
  attribute :players
  after_create :create_game_code

  def full
    self.players.size >= 16
  end

    aasm :whiny_transitions => false do
    state :waiting, :initial => true
    state :initialized, :inform, :exchange, :activity, :finished
    after_all_transitions :log_status_change

    event :initializing do
      transitions :from => :waiting, :to => :initialized, :after => :init_game
    end

    event :started do
      transitions :from => :initialized, :to => :inform
    end

    event :exchanged do
      transitions :from => :exchange, :to => :activity
    end

    event :skills_used do
      transitions :from => :activity, :to => :inform, :after => :update_round
    end

    event :informed do
      transitions :from => :inform, :to => :exchange
    end

    event :finish do
      transitions :from => :inform, :to => :finished
    end

    event :reset do
      transitions :from => :initialized, :to => :waiting
      transitions :from => :inform, :to => :waiting
      transitions :from => :exchange, :to => :waiting
      transitions :from => :activity, :to => :waiting
      transitions :from => :finished, :to => :waiting
    end

  end

  def get_game_object
    data = {
              id: self.id,
              aasm_state: self.aasm_state,
              round: self.round,
              players: self.players.select(:id, :codename, :state, :role_id, :relations).to_a,
              party_distribution: self.get_party_members
           }
    GamesChannel.broadcast_to(self, type: 'game_updated', data: data)
  end

  def get_game_code
    self.code
  end

  def log_status_change
    puts "Game #{self.id} '#{self.title}' changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def init_game
    data = Hash.new
    data['round'] = self.round
    roles_array = assign_roles(self.players.size)
    self.players.each do |player|
      player.get_character(roles_array.delete(roles_array.sample))
      player.get_codename
    end
    self.players.each do |player|
      #player.get_relations
      data['players'] = self.players
      data['current_player'] = player
      data['role_details'] = player.role
      #data['relations'] = player.relations
      UserChannel.broadcast_to(player, type: 'player_initialized_game', data: data)
    end
    get_party_members
    get_game_object
  end

  def update_round
    self.round = 0 if self.round.blank?
    self.round += 1
    self.save
    data = self.round
  end

  def get_party_members
    data = Hash.new
    data["Mafia"], data["Town"], data["Anarchist"] = 0
    self.players.each do |player|
      data["Mafia"] += 1 if player.role.try(:party) == "Mafia"
      data["Town"]+= 1 if player.role.try(:party) == "Town"
      data["Anarchist"]+= 1 if player.role.try(:party) == "Anarchists"
    end
    data
  end

  def add_player(player)
    self.players << player
    get_game_object
  end

  def create_game_code
    code = (('A'..'Z').to_a + ('0'..'9').to_a).shuffle[0,4].join
    self.update(code: code)
  end

=begin
  def update_ui
  end

  def start_timer
  end

  def get_news
  end

  def get_population
  end

  def get_mafia_members
  end

  def get_town_members
  end

  def get_processed_activities
  end

  def display_town
  end

  def save_results
  end

  def process_activities
  end
=end

end
