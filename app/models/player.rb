class Player < ApplicationRecord
  include AASM
  aasm column: 'state', whiny_transitions: false do
    state :alive, initial: true
    state :dead, :disconnected, :imprisoned
  end
  belongs_to :game, optional: true
  belongs_to :role, optional: true
  has_many :articles

  def get_player_object
    {
      id: id,
      codename: codename,
      state: state,
      role: { id: role.try(:id),
              name: self.try(:role).try(:name),
              image: self.try(:role).try(:image),
              skill: { active: self.try(:role).try(:active),
                       img_active: nil,
                       passive: self.try(:role).try(:passive),
                       img_passive: nil
                     }
            }
    }
  end

  def create_codename
    name = Faker::Name.name
    update(codename: name)
  end

  def assign_character(role)
    update(role_id: role)
  end

  def get_relations
    name = role.name
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
    Player.where(game: self).joins(Role).where(roles: {name: role}).pluck(:codename, :name  )
  end

  def use_skill(victim)
    create_article(victim, calculate_success(self, victim, role.active))
  end

  def create_article(victim, success)
    Article.create(game: victim.game, round: victim.game.round, committer_id: id, victim_id: victim.id, success: success)
    puts "#{self.codename} used #{role.try(:active)} on #{victim.codename}"
  end

  def calculate_success(*)
    true
  end

end
