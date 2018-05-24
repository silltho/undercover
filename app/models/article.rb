class Article < ApplicationRecord
  belongs_to :game
  belongs_to :committer, class_name: 'Player'
  belongs_to :victim, class_name: 'Player', optional: true
end
