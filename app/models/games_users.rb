class GamesUsers < ApplicationRecord
  include AASM
  aasm :column => 'state', :whiny_transitions => false do
    state :alive, :initial => true
    state :dead, :disconnected, :imprisoned
  end
  belongs_to :game
  belongs_to :user
  belongs_to :role, optional: true
  validates :user, uniqueness: { scope: :game,
                                 message: "you can only join the same game once" }

  def get_codename
    name = Faker::Name.name
    self.update(codename: name)
  end

  def get_character(role)
    self.update(role_id: role)
  end
end
