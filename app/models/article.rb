class Article < ApplicationRecord
  belongs_to :game
  belongs_to :committer, class_name: 'Player'
  belongs_to :victim, class_name: 'Player'
  validates :committer, uniqueness: { scope: [:game, :round], message: 'You can only perform one action each round' }
end
