class GamesUsers < ApplicationRecord
  include AASM
  aasm :column => 'state', :whiny_transitions => false do
    state :alive, :initial => true
    state :dead, :disconnected, :imprisoned
  end
  belongs_to :game, optional: true
  belongs_to :role, optional: true

  def get_player_object
    {
        id: self.id,
        codename: self.codename,
        state: self.state,
        role: {
            id: self.role.try(:id),
            name: self.try(:role).try(:name),
            image: self.try(:role).try(:image),
            skill: {
                active: self.try(:role).try(:active),
                img_active: nil,
                passive: self.try(:role).try(:passive),
                img_passive: nil
            }
        }
    }
  end

  def get_codename
    name = Faker::Name.name
    self.update(codename: name)
  end

  def get_character(role)
    self.update(role_id: role)
  end

  def get_relations
    name = self.role.name
    rel = []
    case name
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
    GamesUsers.where(game: self).joins(Role).where(roles: {name: role}).pluck(:codename, :role_id, :name  )
  end

end
