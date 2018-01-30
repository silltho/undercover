class Game < ApplicationRecord
  include AASM
  belongs_to :user
  has_many :games_users, class_name: 'GamesUsers', dependent: :destroy
  has_many :users, through: :games_users

  aasm :whiny_transitions => false do
    state :waiting, :initial => true
    state :initialized, :running, :done
    after_all_transitions :log_status_change

    event :initializing do
      transitions :from => :waiting, :to => :initialized
    end

    event :start do
      transitions :from => :initialized, :to => :running
    end

    event :finish do
      transitions :from => :running, :to => :done
    end
  end

  def log_status_change
    puts "Game #{self.id} '#{self.title}' changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def get_codename
  end

  def get_character
  end

  def get_relations
    #after relations are clear, game starts
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
end
