class Player < ApplicationRecord
  include AASM
  belongs_to :game, optional: true
  belongs_to :role, optional: true
  has_many :articles

  aasm column: 'state', whiny_transitions: false do
    state :alive, initial: true
    state :dead, :imprisoned

    event :imprison do
      transitions from: :alive, to: :imprisoned
    end

    event :release do
      transitions from: :imprisoned, to: :alive
    end

    event :die do
      transitions from: :alive, to: :dead
      transitions from: :imprisoned, to: :dead
    end

    event :reset do
      transitions from: :imprisoned, to: :alive
      transitions from: :dead, to: :alive
    end
  end

  def get_player_object
    {
      id: id,
      codename: codename,
      state: state,
      changed_party: changed_party,
      role: { id: role.try(:id),
              name: self.try(:role).try(:name),
              image: self.try(:role).try(:image),
              party: role.try(:party),
              goal: role.try(:goal),
              lore: role.try(:lore),
              punchline: role.try(:punchline),
              active: role.try(:active),
              passive: role.try(:passive)
            }
    }
  end

  def broadcast_player_updated
    reload
    UserChannel.broadcast_to(self, type: 'player_updated', data: get_player_object)
  end

  def create_codename
    name = Faker::Name.name
    update(codename: name)
  end

  def change_party
    update(changed_party: true)
  end

  def reveal_identity(committer)
    committer.relations << [codename, role.name]
  end

  def assign_character(role)
    reset!
    update(role_id: role, changed_party: false, relations: [])
  end

  def get_relations
    name = role.try(:name)
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
    update(relations: rel)
  end

  def query_relation_information(role)
    role = Role.where(name: role).first
    known = Player.where(game: game).where(role_id: role).pluck(:id, :codename).first
    return [known.first, known.second, role.try(:name)] if known.present?
    nil
  end
end
