class GamesUsers < ApplicationRecord
  include AASM
  aasm :column => 'state', :whiny_transitions => false do
    state :alive, :initial => true
    state :dead, :disconnected, :imprisoned
  end
  belongs_to :game
  belongs_to :user
  belongs_to :role
  validates :user, uniqueness: { scope: :game,
                                 message: "you can only join the same game once" }
end
