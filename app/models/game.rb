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
end
