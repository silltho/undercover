require 'rails_helper'

RSpec.describe Player, type: :model do
  let!(:player) { Player.new }

  it 'sets a random codename' do
    expect(player.codename).to be_nil
    expect(player.create_codename).not_to be_nil
  end

  it 'assigns a role to the player' do
    expect(player.role).to be_nil
    expect(player.assign_character(Role.last)).not_to be_nil
  end

  it 'has no game at the beginning' do
    expect(player.game).to be_nil
  end

  it 'is alive at the beginning' do
    expect(player).to have_state(:alive)
  end

  it 'can be imprisoned' do
    expect(player).to have_state(:alive)
    expect(player).to allow_event :imprison
    expect(player).not_to have_state(:imprisoned)
    expect(player).to transition_from(:alive).to(:imprisoned).on_event(:imprison)
    expect(player).to have_state(:imprisoned)
  end

  it 'can die if in prison' do
    user = User.new(id: 1)
    player = Player.new(user: user)
    player.imprison!
    expect(player).to have_state(:imprisoned)
    expect(player).to allow_event :die
    expect(player).not_to have_state(:dead)
    expect(player).to transition_from(:imprisoned).to(:dead).on_event(:die)
    expect(player).to have_state(:dead)
  end

  it 'can die if alive' do
    player = Player.new
    expect(player).to have_state(:alive)
    expect(player).to allow_event :die
    expect(player).not_to have_state(:dead)
    expect(player).to transition_from(:alive).to(:dead).on_event(:die)
    expect(player).to have_state(:dead)
  end

  it 'can be converted or corrupted aka change party' do
    u1 = User.create(id: 1)
    player = Player.new(id: 1, user: u1)
    expect(player.changed_party).to be false
    player.change_party
    expect(player.changed_party).to be true
  end

  it 'can reveal its identity' do
    gf = Role.create(name: "Godfather")
    bg = Role.create(name: "Bodyguard")
    p1 =  Player.create(id: 6, role: gf)
    p2 = Player.create(id: 7, role: bg)
    expect(p1.role).not_to be_nil
    expect(p2.role).not_to be_nil
    expect(p2.relations).to be_empty
    p1.reveal_identity(p2)
    expect(p2.relations).not_to be_empty
    expect(p1.relations).to be_empty
    p2.reveal_identity(p1)
    expect(p1.relations).not_to be_empty
  end

=begin
  it 'gets its relations as Godfather' do
    gf = Role.create(name: "Godfather", id: 1)
    bg = Role.create(name: "Bodyguard", id: 2)
    p1 = Player.create(role: gf, id: 8, codename: "player1")
    p2 = Player.create(role: bg, id: 9, codename: "player2")
    expect(p1.relations).to be_empty
    p1.get_relations
    expect(p1.relations).not_to be_empty
    expect(p1.relations.count).to eql(1)
    expect(p1.relations.first.first).to eql(9)
  end

  it 'gets its relations as Chief' do
    ch = Role.create(name: "Chief")
    of = Role.create(name: "Officer")
    pr = Role.create(name: "President")
    p1 = Player.create(role: ch, id: 10, codename: "player1")
    p2 = Player.create(role: of, id: 11, codename: "player2")
    p3 = Player.create(role: pr, id: 12, codename: "player3")
    expect(p1.relations).to be_empty
    p1.get_relations
    expect(p1.relations).not_to be_empty
    expect(p1.relations.count).to eql(2)
  end

  it 'gets its relations as Junior' do
    jr = Role.create(name: 'Junior')
    p = Player.create(role: jr, id: 13, codename: 'Giftmischer')
    expect(p.relations).to be_empty
    p.get_relations
    expect(p.relations).to be_empty
  end
=end


end
