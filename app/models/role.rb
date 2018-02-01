class Role < ApplicationRecord
  belongs_to :player, class_name: 'GamesUsers'
end
