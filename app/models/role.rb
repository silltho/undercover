class Role < ApplicationRecord
  has_many :players
  has_many :relations, dependent: :destroy
end
