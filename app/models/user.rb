class User < ApplicationRecord
  has_many :identities

  def self.create_with_omniauth(auth)
   create(email: auth['info']['email'])
  end

  def name
  	self.email[/[^@]+/]
  end
end
