class User < ApplicationRecord
  has_many :identities
  has_many :games_users, class_name: 'GamesUsers'
  has_many :games, through: :games_users
  accepts_nested_attributes_for :games_users


  def self.find_or_create_omniauth(auth)
    where(email: auth['info']['email']).first_or_create
  end

  def get_codename
    name = Faker::Name.name
    GamesUsers.where(user_id: self.id).update(codename: name)
  end

  def get_character
    role = Role.all.sample.id
    GamesUsers.where(user_id: self.id).update(role_id: role)
  end
end
