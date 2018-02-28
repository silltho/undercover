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
        rel.push(query_relation_information("Bodyguard"))
      when "Bodyguard"
        rel.push(query_relation_information("Godfather"))
      when "President"
        rel.push(query_relation_information("Chief"))
      when "Chief"
        rel.push(query_relation_information("President"))
        rel.push(query_relation_information("Officer"))
      when "Officer"
        rel.push(query_relation_information("Chief"))
      when "Agent"
        rel.push(query_relation_information("Chief"))
        rel.push(query_relation_information("President"))
        rel.push(query_relation_information("Officer"))
      else
        rel = []
    end
    self.update(relations: rel)
  end

  def query_relation_information(role)
    GamesUsers.where(game: self).where(roles: {name: role}).pluck(:codename, :role_id, :name  )
  end

end
