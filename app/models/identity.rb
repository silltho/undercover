class Identity < ActiveRecord::Base
  belongs_to :user

  def self.find_or_create_omniauth(auth)
    where(uid: auth['uid'], provider: auth['provider']).first_or_create
  end
end
