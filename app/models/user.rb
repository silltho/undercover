class User < ApplicationRecord
  has_many :identities
  has_many :messages, dependent: :destroy
  has_many :games

  def self.find_or_create_omniauth(auth)
    where(email: auth['info']['email']).first_or_create
  end
end
