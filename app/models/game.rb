class Game < ApplicationRecord
  include AASM
  require 'faker'
  belongs_to :user
  has_many :players, class_name: 'GamesUsers', dependent: :destroy
  has_many :users, through: :players
  accepts_nested_attributes_for :players
  attribute :players
  attribute :full

  def full
    self.users.size >= 1
  end

    aasm :whiny_transitions => false do
    state :waiting, :initial => true
    state :initialized, :informed, :exchanged, :skills_used, :finished
    after_all_transitions :log_status_change

    event :initializing do
      transitions :from => :waiting, :to => :initialized, :after => :initialize_players
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

  def initialize_players
    data = Hash.new
    data['round'] = self.round
    self.users.each do |user|
      user.get_init_data
    end
    data['players'] = self.players
    GamesChannel.broadcast_to(self, type: 'initialized_game', data: data)
    self.start
  end

  def update_round
    self.round = 0 if self.round.blank?
    self.round += 1
    self.save
    data = self.round
    GamesChannel.broadcast_to(self, type: 'update_round', data: data)
  end

=begin
  def update_ui
  end

  def start_timer
    #gehört sowas ned eher ins frontend?
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


  private

  def process_activities
  end
=end

end
