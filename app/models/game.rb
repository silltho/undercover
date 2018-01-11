class Game < ApplicationRecord
  belongs_to :user
  has_many :games_users
  has_many :users, through: :games_users
end
