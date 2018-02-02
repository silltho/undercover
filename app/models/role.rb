class Role < ApplicationRecord
  has_many :players, class_name: 'GamesUsers'
end
