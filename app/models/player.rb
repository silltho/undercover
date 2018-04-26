class Player < ApplicationRecord
  include AASM
  belongs_to :game, optional: true
  belongs_to :role, optional: true
  belongs_to :user
  has_many :articles
  has_many :relations
  has_many :action_logs

  aasm column: 'state', whiny_transitions: false do
    state :alive, initial: true
    state :dead, :imprisoned, :disconnected

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

    event :disconnect do
      transitions from: :alive, to: :disconnected
    end

    event :reconnect do
      transitions from: :disconnected, to: :alive
    end
  end

  def get_player_object
    reload
    {
      id: id,
      codename: codename,
      state: state,
      changed_party: changed_party,
      other_players: build_relations,
      role: { id: role.try(:id),
              name: self.try(:role).try(:name),
              image: self.try(:role).try(:image),
              party: role.try(:party),
              goal: role.try(:goal),
              lore: role.try(:lore),
              punchline: role.try(:punchline),
              active: role.try(:active),
              passive: role.try(:passive),
              active_text: role.try(:active_text),
              passive_text: role.try(:passive_text)
            }
    }
  end

  def get_victim_object(victim)
    {
      name: victim.codename,
      state: victim.state,
      role: victim.role.name,
      changed_party: victim.changed_party
    }
  end

  def broadcast_player_updated
    UserChannel.broadcast_to(user, type: 'player_updated', data: get_player_object)
  end

  def broadcast_spy_action(victim)
    v = Relation.where(player1: self, player2: victim).first_or_create
    v.update(role: victim.role, loyal: victim.is_loyal?)
    UserChannel.broadcast_to(user, type: 'player_informed', data: get_victim_object(victim))
  end

  def broadcast_you_won
    UserChannel.broadcast_to(user, type: 'player_won', data: nil)
  end

  def broadcast_you_lost
    UserChannel.broadcast_to(user, type: 'player_lost', data: nil)
  end

  def broadcast_waiting_for_players
    UserChannel.broadcast_to(user, type: 'waiting_for_others', data: nil)
  end

  def create_codename
    name = Faker::Name.name
    update(codename: name)
  end

  def is_loyal?
    !changed_party
  end

  def change_party!
    toggle!(:changed_party)
  end

  def reveal_identity(committer)
    committer.relations << [codename, role.name]
  end

  def assign_character(role)
    update(role_id: role, changed_party: false)
  end

  def build_relations
    rel = Relation.where(player1: self)
    data = []
    rel.each do |entry|
      data.push([entry.player2.id, entry.role.try(:name), entry.loyal ])
    end
    data
  end

  def get_relations
    set_nil_relations
    role.known_roles.split(' ').each do |other_role|
      set_relation_information(other_role)
    end
  end

  def set_nil_relations
    Player.where(game: game).where.not(id: id).each do |other|
      Relation.create(player1: self, player2: other, role: nil, loyal: true)
    end
  end

  def set_relation_information(role)
    role = Role.where(name: role).first
    player2 = Player.where(game: game).where(role: role).first
    Relation.where(player1: self, player2: player2).first_or_create.update_attributes(role: role, loyal: player2.is_loyal?) unless player2.nil?
  end
end
