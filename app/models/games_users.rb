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

  def get_relations
    role = Role.find(self.role_id).name
    rel = []
    case role
      when "Godfather"
        rel.push(Role.where(name: "Bodyguard").pluck(:id))
      when "Bodyguard"
        rel.push(Role.where(name: "Godfather").pluck(:id))
      when "President"
        rel.push(Role.where(name: "Chief").pluck(:id))
      when "Chief"
        rel.push(Role.where(name: "President").pluck(:id))
        rel.push(Role.where(name: "Officer").pluck(:id))
      when "Officer"
        rel.add(Role.where(name: "Chief").pluck(:id))
      when "Agent"
        rel.push(Role.where(name: "Chief").pluck(:id))
        rel.push(Role.where(name: "President").pluck(:id))
        rel.push(Role.where(name: "Officer").pluck(:id))
      else
        rel = []
    end

    self.update(relations: rel)
  end

end
