class User < ApplicationRecord
  has_many :identities
  has_many :players, class_name: 'GamesUsers'
  has_many :games, through: :players
  accepts_nested_attributes_for :players


  def self.find_or_create_omniauth(auth)
    where(email: auth['info']['email']).first_or_create
  end

  def get_codename
    name = Faker::Name.name
    GamesUsers.where(user_id: self.id).update(codename: name)
  end

  def get_character(role)
    GamesUsers.where(user_id: self.id).update(role_id: role)
  end
end
