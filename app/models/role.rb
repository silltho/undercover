class Role < ApplicationRecord
  has_many :players, class_name: 'Player'
end
