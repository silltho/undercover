class Game < ApplicationRecord
  include AASM
  require 'faker'
  has_many :players, class_name: 'GamesUsers', dependent: :destroy
  has_many :users, through: :players
  accepts_nested_attributes_for :players
  attribute :players
  attribute :full

  def full
    self.users.size >= 16
  end

    aasm :whiny_transitions => false do
    state :waiting, :initial => true
    state :initialized, :informed, :exchanged, :skills_used, :finished
    after_all_transitions :log_status_change

    event :initializing do
      transitions :from => :waiting, :to => :initialized, :after => :start_game
    end

    event :start do
      transitions :from => :initialized, :to => :informed
    end

    event :exchanging do
      transitions :from => :informed, :to => :exchanged
    end

    event :use_skills do
      transitions :from => :exchanged, :to => :skills_used, :after => :update_round
    end

    event :informing do
      transitions :from => :skills_used, :to => :informed
    end

    event :finish do
      transitions :from => :informed, :to => :finished
    end

    event :reset do
      transitions :from => :initialized, :to => :waiting
      transitions :from => :informed, :to => :waiting
      transitions :from => :exchanged, :to => :waiting
      transitions :from => :skills_used, :to => :waiting
      transitions :from => :finished, :to => :waiting
    end

  end

  def log_status_change
    puts "Game #{self.id} '#{self.title}' changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def start_game
    data = Hash.new
    data['round'] = self.round
    roles_array = assign_roles(self.users.size)
    self.players.each do |player|
      player.get_character(roles_array.delete(roles_array.sample))
      player.get_codename
    end
    self.players.each do |player|
      #player.get_relations
      data['players'] = self.players
      data['current_player'] = player
      data['role_details'] = player.role
      UserChannel.broadcast_to(player.user, type: 'player_initialized_game', data: data)
    end
    get_party_members
    self.start
  end

  def update_round
    self.round = 0 if self.round.blank?
    self.round += 1
    self.save
    data = self.round
    GamesChannel.broadcast_to(self, type: 'update_round', data: data)
  end

  def get_party_members
    data = Hash.new
    data["Mafia"] = 0
    data["Town"] = 0
    data["Anarchist"] = 0
    self.players.each do |player|
      data["Mafia"] += 1 if player.role.party == "Mafia"
      data["Town"]+= 1 if player.role.party == "Town"
      data["Anarchist"]+= 1 if player.role.party == "Anarchists"
    end
    GamesChannel.broadcast_to(self, type: 'party_members', data: data)
  end

  def get_population
    self.players.where(state: "alive").count
  end

  def create_game_code
    code = (('A'..'Z').to_a + ('0'..'9').to_a).shuffle[0,8].join
    self.update(code: code)
  end

  def get_game_code
    self.code
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
