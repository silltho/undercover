class Game < ApplicationRecord
  #include AASM
  #require 'faker'
  belongs_to :user
  has_many :games_users, class_name: 'GamesUsers', dependent: :destroy
  has_many :users, through: :games_users
  accepts_nested_attributes_for :games_users
  attribute :users
  attribute :full

  def full
    self.users.size >= 1
  end

=begin
    aasm :whiny_transitions => false do
    state :waiting, :initial => true
    state :initialized, :running, :done
    after_all_transitions :log_status_change

    event :initializing do
      transitions :from => :waiting, :to => :initialized, :after => :initialize_players
    end

    event :start do
      transitions :from => :initialized, :to => :running
    end

    event :finish do
      transitions :from => :running, :to => :done
    end

    event :reset do
      transitions :from => :initialized, :to => :waiting
      transitions :from => :running, :to => :waiting
    end

  end

  def log_status_change
    puts "Game #{self.id} '#{self.title}' changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def initialize_players
    data = []
    self.users.each do |player|
      player.get_codename
      player.get_character
    end
    data << self.users.to_a
    GamesChannel.broadcast_to(self, type: 'initialized_game', data: data)
    self.start
  end

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
