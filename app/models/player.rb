class Player < ApplicationRecord
  include AASM
  belongs_to :game, optional: true
  belongs_to :role, optional: true
  belongs_to :user
  has_many :articles, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :action_logs, dependent: :destroy

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
      party: get_party,
      other_players: build_relations,
      role: { id: role.try(:id),
              name: role.try(:name),
              image: role.try(:image),
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
      party: victim.get_party
    }
  end

  def broadcast_player_updated
    UserChannel.broadcast_to(user, type: 'player_updated', data: get_player_object)
  end

  def broadcast_spy_action(victim)
    v = Relation.where(player1: self, player2: victim).first_or_create
    v.update(role: victim.role, party: victim.get_party)
    UserChannel.broadcast_to(user, type: 'player_informed', data: get_victim_object(victim))
  end

  def broadcast_you_won
    UserChannel.broadcast_to(user, type: 'winning_information', data: 'Victory')
  end

  def broadcast_you_lost
    UserChannel.broadcast_to(user, type: 'winning_information', data: 'Defeat')
  end

  def broadcast_draw
    UserChannel.broadcast_to(user, type: 'winning_information', data: 'Draw')
  end

  def broadcast_waiting_for_players
    UserChannel.broadcast_to(user, type: 'waiting_for_others', data: nil)
  end

  def is_loyal?
    !changed_party
  end

  def change_party!
    toggle!(:changed_party)
  end

  def assign_character(role)
    update(role_id: role, changed_party: false)
  end

  def build_relations
    rel = Relation.where(player1: self)
    data = []
    rel.each do |entry|
      data << {id: entry.player2.id, codename: entry.player2.try(:codename), state: entry.player2.try(:state), role: entry.try(:role).try(:name), party: entry.try(:party)}
    end
    data
  end

  def get_party
    return "Anarchists" if belongs_to_anarchists
    return "Town" if belongs_to_town
    "Mafia" if belongs_to_mafia
  end

  def belongs_to_mafia
    (role.try(:party) == "Mafia" && changed_party == false) || (role.try(:party) == "Town" && changed_party == true)
  end

  def belongs_to_town
    (role.try(:party) == "Town" && changed_party == false) || (role.try(:party) == "Mafia" && changed_party == true)
  end

  def belongs_to_anarchists
    role.try(:party) == "Anarchists"
  end

  def relations
    Relation.where(player1: self)
  end

  def init_relations
    set_nil_relations
    return if role.known_roles.nil?
    role.known_roles.split(' ').each do |other_role|
      set_relation_information(other_role)
    end
  end

  def set_nil_relations
    Player.where(game: game).where.not(id: id).each do |other|
      Relation.where(player1: self, player2: other, role: nil, party: nil).first_or_create
    end
  end

  def set_relation_information(role)
    role = Role.where(name: role).first
    player2s = Player.where(game: game).where(role: role)
    return if player2s.nil?
    player2s.each do |player2|
      Relation.where(player1: self, player2: player2).first_or_create.update_attributes(role: player2.role, party: player2.get_party)
    end
  end
end
