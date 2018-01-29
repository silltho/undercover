class Game < ApplicationRecord
  belongs_to :user
  has_many :games_users, class_name: 'GamesUsers', dependent: :destroy
  has_many :users, through: :games_users
end
