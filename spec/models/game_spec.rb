require 'rails_helper'
require 'aasm/rspec'

RSpec.describe Game, type: :model do
  let!(:game) { Game.new }
  #game = instance_double("Game", id: 1)
  # let!(:u1) { instance_double('User', id: 1)}
  # let!(:u2) { instance_double('User', id: 2)}
  # let!(:u3) { instance_double('User', id: 3)}
  # let!(:u4) { instance_double('User', id: 4)}
  # let!(:p1) { instance_double('Player', id: 1, user: u1)}
  # let!(:p2) { instance_double('Player', id: 2, user: u2)}
  # let!(:p3) { instance_double('Player', id: 3, user: u3)}
  # let!(:p4) { instance_double('Player', id: 1, user: u4)}


  it 'is valid with valid attributes' do
    expect(game).to be_valid
  end

  it 'creates a valid game code' do
    code = game.create_game_code
    expect(code.length).to eql(4)
    expect(code).to be_a_kind_of(String)
    expect(code).not_to match('/[a-zA-Z]+/')
  end

  it 'has a valid game code' do
    game = Game.create
    expect(game.code.length).to eql(4)
    expect(game.code).to be_a_kind_of(String)
  end

  it 'changes from waiting to initialized' do
    game = Game.create(id: 2)
    expect(game).to have_state(:waiting)
    expect(game).to allow_event :initializing
    expect(game).not_to have_state(:initialized)
    expect(game).to transition_from(:waiting).to(:initialized).on_event(:initializing)
    expect(game).to have_state(:initialized)
  end

  it 'changes from initialized to activity' do
    game = Game.create(id: 3)
    game.initializing!
    expect(game).to have_state(:initialized)
    expect(game).to allow_event :started
    expect(game).not_to have_state(:inform)
    expect(game).to transition_from(:initialized).to(:activity).on_event(:started)
    expect(game).to have_state(:activity)
  end

  it 'changes from inform to exchanged' do
    game = Game.create(id: 4, aasm_state: "inform")
    expect(game).to have_state(:inform)
    expect(game).to allow_event :informed
    expect(game).not_to have_state(:exchange)
    expect(game).to transition_from(:inform).to(:activity).on_event(:informed)
    expect(game).to have_state(:activity)
  end

  it 'changes from activity to informed' do
    game = Game.create(id: 6)
    game.initializing!
    game.started!
    game.informed!
    expect(game).to have_state(:activity)
    expect(game).to allow_event :skills_used
    expect(game).not_to have_state(:inform)
    expect(game).to transition_from(:activity).to(:inform).on_event(:skills_used)
    expect(game).to have_state(:inform)
  end

  it 'is full if 9 players have joined' do
    game = Game.create(id: 7)
    8.times do
     p = Player.new
     game.players << p
    end
    expect(game.full).to be false
    p = Player.new
    game.players << p
    expect(game.full).to be true
  end

  it 'updates the round' do
    game = Game.create(id: 8)
    expect(game.round).to eql(0)
    game.update_round
    expect(game.round).to eql(1)
  end

  it 'adds players to the game' do
    u1 = User.create(id: 40, session_id: 123)
    u2 = User.create(id: 41, session_id: 1235)
    p1 = Player.create(user: u1)
    p2 = Player.create(user: u2)
    game = Game.create(id: 10)
    expect(game.players.count).to eql(0)
    game.add_player(p1)
    expect(game.players.count).to eql(1)
    game.add_player(p2)
    expect(game.players.count).to eql(2)
  end

  it 'only allows unique game codes' do
    game = Game.create(id: 11)
    expect(game.unique_game_code(game.code)).to be false
    expect(game.unique_game_code(game.create_game_code)).to be true
  end

  it 'assigns roles and code-names to players' do
    Role.create(id: 1, name: "Godfather", power: 4, known_roles: "Bodyguard")
    Role.create(id: 2, name: "President", power: 4, known_roles: "Chief")
    Role.create(id: 3, name: "Junior", power: 4, known_roles: nil)
    game = Game.create(id: 12)
    expect(game.players.count).to eql(0)
    u1 = User.create(id: 43, session_id: 123)
    u2 = User.create(id: 44, session_id: 1235)
    p1 = Player.create(id: 4, user: u1)
    p2 = Player.create(id: 5, user: u2)
    game.add_player(p1)
    game.add_player(p2)
    expect(game.players.count).to eql(2)
    expect(p1.role).to be_nil
    expect(p2.role).to be_nil
    game.init_game
    p1.reload
    p2.reload
    expect(p1.role).not_to be_nil
    expect(p2.role).not_to be_nil
  end

  it 'returns an array with articles' do
    Role.create(id: 1, name: "Godfather", power: 4, active: "corrupt", passive: "immunity")
    Role.create(id: 2, name: "President", power: 4, active: "convert", passive: "immunity")
    Role.create(id: 3, name: "Junior", power: 4, active: "poison")
    game = Game.create(id: 14)
    expect(game.players.count).to eql(0)
    u1 = User.create(id: 45, session_id: 123)
    u2 = User.create(id: 46, session_id: 1235)
    p1 =  Player.create(id: 3, user: u1)
    p2 = Player.create(id: 4, user: u2)
    game.players << p1
    game.players << p2
    game.initializing!
    game.use_skill(p1.id, p2.id)
    expect(game.create_stories(1)).to be_an_instance_of(Array)
  end

  # common
  it 'can use a skill on another player' do
    gf = Role.create(id: 1, name: "Godfather", power: 4, known_roles: "Bodyguard")
    pr = Role.create(id: 2, name: "President", power: 4, known_roles: "Chief")
    u1 = User.create(id: 47, session_id: 123)
    u2 = User.create(id: 48, session_id: 1235)
    p1 = Player.create(id: 3, user: u1, role: gf)
    p2 = Player.create(id: 4, user: u2, role: pr)
    g = Game.create(id: 13)
    g.players << p1
    g.players << p2
    g.init_game
    expect(g).to receive(:create_article)
    expect(g).to receive(:create_article)
    g.use_skill(p1.id, p2.id)
    g.use_skill(p2.id, p1.id)
  end

  # Junior
  it 'can kill any player as Junior' do
    gf = Role.create(name: "Godfather", id: 1, passive: "immunity")
    bg = Role.create(name: "Bodyguard", id: 2)
    jr = Role.create(name: "Junior", id: 3, active: "poison")
    ag = Role.create(name: "Agent", id: 4)
    u1 = User.create(id: 9, session_id: 123)
    u2 = User.create(id: 10, session_id: 1235)
    u3 = User.create(id: 11, session_id: 1234)
    u4 = User.create(id: 12, session_id: 5421)
    p1 = Player.create(id: 5, role: gf, user: u1)
    p2 = Player.create(id: 6, role: jr, user: u2)
    p3 = Player.create(id: 7, role: bg, user: u3)
    p4 = Player.create(id: 8, role: ag, user: u4)
    g = Game.create(id: 15)
    g.players << p1
    g.players << p2
    g.players << p3
    g.players << p4
    expect(g.calculate_success(p2.id, p4.id)).to be true
    expect(g.calculate_success(p2.id, p1.id)).to be true
    expect(g.calculate_success(p2.id, p3.id)).to be true
  end

  # President and Godfather
  it "can't convert or corrupt the head of the other party" do
    gf = Role.create(name: "Godfather", id: 1, active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 2, active: "corrupt", passive: "immunity")
    u1 = User.create(id: 13, session_id: 123)
    u2 = User.create(id: 14, session_id: 1235)
    p1 = Player.create(id: 5, role: gf, user: u1, changed_party: false)
    p2 = Player.create(id: 6, role: pr, user: u2, changed_party: false)
    g = Game.create(id: 15)
    g.players << p1
    g.players << p2
    expect(g.calculate_success(p1.id, p2.id)).to be false
    expect(g.calculate_success(p2.id, p1.id)).to be false
    expect(p1.changed_party).to be false
    expect(p2.changed_party).to be false
  end

  # President and Godfather
  it "can convert or corrupt a player of the other fraction" do
    gf = Role.create(name: "Godfather", id: 1, party: "Mafia", active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 2, party: "Town", active: "convert", passive: "immunity")
    ag = Role.create(name: "Agent", id: 3, party: "Town", active: "spy")
    bb = Role.create(name: "Beagle Boy", id: 4, party: "Mafia", active: "free")
    u1 = User.create(id: 15, session_id: 123)
    u2 = User.create(id: 16, session_id: 1235)
    u3 = User.create(id: 17, session_id: 1234)
    u4 = User.create(id: 18, session_id: 5421)
    p1 = Player.create(id: 5, role: gf, changed_party: false, user: u1)
    p2 = Player.create(id: 6, role: pr, changed_party: false, user: u2)
    p3 = Player.create(id: 7, role: ag, changed_party: false, user: u3)
    p4 = Player.create(id: 8, role: bb, changed_party: false, user: u4)
    g = Game.create(id: 17)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    g.add_player(p4)
    expect(g.calculate_success(p2.id, p3.id)).to be false
    expect(p3.changed_party).to be false
    expect(g.calculate_success(p1.id, p3.id)).to be true
    g.apply_action(p1, p3)
    p3.reload
    expect(p3.changed_party).to be true
    expect(g.calculate_success(p1.id, p4.id)).to be false
    expect(p4.changed_party).to be false
    expect(g.calculate_success(p2.id, p4.id)).to be true
    g.apply_action(p2, p4)
    p4.reload
    expect(p4.changed_party).to be true
  end

  # Chief and Officer
  it 'can imprison other players as Chief or Officer' do
    ch = Role.create(name: "Chief", id: 1, party: "Town", active: "imprison")
    of = Role.create(name: "Officer", id: 2, party: "Town", active: "imprison")
    ag = Role.create(name: "Agent", id: 3, party: "Town", active: "spy")
    gf = Role.create(name: "Godfather", id: 4, party: "Mafia", active: "corrupt", passive: "immunity")
    u1 = User.create(id: 19, session_id: 123)
    u2 = User.create(id: 20, session_id: 1235)
    u3 = User.create(id: 21, session_id: 1234)
    u4 = User.create(id: 22, session_id: 5421)
    p1 = Player.create(id: 1, role: ch, changed_party: false, user: u1)
    p2 = Player.create(id: 2, role: of, changed_party: false, user: u2)
    p3 = Player.create(id: 3, role: ag, changed_party: false, user: u3)
    p4 = Player.create(id: 4, role: gf, changed_party: false, user: u4)
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    g.add_player(p4)
    expect(g.calculate_success(p1.id, p3.id)).to be true
    expect(g.calculate_success(p1.id, p4.id)).to be true
    expect(g.calculate_success(p1.id, p2.id)).to be true
    expect(g.calculate_success(p2.id, p1.id)).to be true
    expect(g.calculate_success(p2.id, p3.id)).to be true
    expect(g.calculate_success(p2.id, p4.id)).to be true
  end

  # Beagle Boy
  it 'can only free people who are acutally in prison' do
    bb = Role.create(name: "Beagle Boy", id: 3, party: "Mafia", active: "free")
    gf = Role.create(name: "Godfather", id: 4, party: "Mafia", active: "corrupt", passive: "immunity")
    of = Role.create(name: "Officer", id: 2, party: "Town", active: "imprison")
    u1 = User.create(id: 23, session_id: 123)
    u2 = User.create(id: 24, session_id: 1235)
    u3 = User.create(id: 25, session_id: 1234)
    p1 = Player.create(id: 1, role: bb, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: of, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: gf, changed_party: false, user: u3,  state: "imprisoned")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    expect(g.calculate_success(p1.id, p2.id)).to be false
    expect(g.calculate_success(p1.id, p3.id)).to be true
  end

  # Agent and Bodyguard
  it 'can spy or blackmail others' do
    gf = Role.create(name: "Godfather", id: 1, passive: "immunity")
    bg = Role.create(name: "Bodyguard", id: 2, active: "blackmail")
    jr = Role.create(name: "Junior", id: 3, active: "poison")
    ag = Role.create(name: "Agent", id: 4, active: "spy")
    of = Role.create(name: "Officer", id: 5, party: "Town", active: "imprison")
    u1 = User.create(id: 26, session_id: 123)
    u2 = User.create(id: 27, session_id: 1235)
    u3 = User.create(id: 28, session_id: 1234)
    u4 = User.create(id: 29, session_id: 1236)
    u5 = User.create(id: 30, session_id: 12356)
    p1 = Player.create(id: 1, role: bg, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: gf, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    p4 = Player.create(id: 4, role: ag, changed_party: false, user: u4,  state: "alive")
    p5 = Player.create(id: 5, role: of, changed_party: false, user: u5,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    g.add_player(p4)
    g.add_player(p5)
    expect(g.calculate_success(p1.id, p2.id)).to be true
    expect(g.calculate_success(p1.id, p3.id)).to be true
    expect(g.calculate_success(p1.id, p4.id)).to be true
    expect(g.calculate_success(p1.id, p5.id)).to be true
    expect(g.calculate_success(p4.id, p1.id)).to be true
    expect(g.calculate_success(p4.id, p2.id)).to be true
    expect(g.calculate_success(p4.id, p3.id)).to be true
    expect(g.calculate_success(p4.id, p5.id)).to be true

    expect(g).to receive(:create_article)
    expect(g.use_skill(p1.id, p2.id))
  end

  it 'can kill people as Enforcer' do
    gf = Role.create(name: "Godfather", id: 1, passive: "immunity")
    en = Role.create(name: "Enforcer", id: 2, active: "shoot")
    jr = Role.create(name: "Junior", id: 3, active: "poison")
    ag = Role.create(name: "Agent", id: 4, active: "spy")
    of = Role.create(name: "Officer", id: 5, party: "Town", active: "imprison")
    u1 = User.create(id: 31, session_id: 123)
    u2 = User.create(id: 32, session_id: 1235)
    u3 = User.create(id: 33, session_id: 1234)
    u4 = User.create(id: 34, session_id: 1236)
    u5 = User.create(id: 35, session_id: 12356)
    p1 = Player.create(id: 1, role: en, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: gf, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    p4 = Player.create(id: 4, role: ag, changed_party: false, user: u4,  state: "alive")
    p5 = Player.create(id: 5, role: of, changed_party: false, user: u5,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    g.add_player(p4)
    g.add_player(p5)
    expect(g.players.alive.count).to eql 5
    expect(g.calculate_success(p1.id, p2.id)).to be true
    expect(p2).to have_state(:alive)
    g.apply_action(p1, p2)
    expect(p2).to have_state(:dead)
    expect(g.players.alive.count).to eql 4
    expect(p3).to have_state(:alive)
    expect(g.calculate_success(p1.id, p3.id)).to be true
    g.apply_action(p1, p3)
    expect(p3).to have_state(:dead)
    expect(g.players.alive.count).to eql 3
    expect(p4).to have_state(:alive)
    expect(g.calculate_success(p1.id, p4.id)).to be true
    g.apply_action(p1, p4)
    expect(p4).to have_state(:dead)
    expect(g.players.alive.count).to eql 2
    expect(p5).to have_state(:alive)
    expect(g.calculate_success(p1.id, p5.id)).to be true
    g.apply_action(p1, p5)
    expect(p5).to have_state(:dead)
    expect(g.players.alive.count).to eql 1
  end

  it 'Junior wins if both heads dead' do
    gf = Role.create(name: "Godfather", id: 1, active: "corrupt", passive: "immunity")
    en = Role.create(name: "Enforcer", id: 2, active: "shoot")
    jr = Role.create(name: "Junior", id: 3, active: "poison")
    pr = Role.create(name: "President", id: 4, party: "Town", active: "convert", passive: "immunity")
    of = Role.create(name: "Officer", id: 5, party: "Town", active: "imprison")
    u1 = User.create(id: 36, session_id: 123)
    u2 = User.create(id: 37, session_id: 1235)
    u3 = User.create(id: 38, session_id: 1234)
    u4 = User.create(id: 39, session_id: 1236)
    u5 = User.create(id: 40, session_id: 12356)
    p1 = Player.create(id: 1, role: en, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: gf, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    p4 = Player.create(id: 4, role: pr, changed_party: false, user: u4,  state: "alive")
    p5 = Player.create(id: 5, role: of, changed_party: false, user: u5,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    g.add_player(p4)
    g.add_player(p5)
    expect(g.players.alive.count).to eql 5
    expect(g.calculate_success(p3.id, p2.id)).to be true
    g.apply_action(p3, p2)
    expect(p2).to have_state(:dead)
    expect(g.calculate_success(p3.id, p4.id)).to be true
    g.apply_action(p3, p4)
    expect(p4).to have_state(:dead)
    expect(p3).to have_state(:alive)
    expect(p1).to have_state(:alive)
    expect(p5).to have_state(:alive)
    expect(g.players.alive.count).to eql 3
    expect(g.both_heads_dead?).to eql true
  end

  it 'shows that both heads are dead' do
    gf = Role.create(name: "Godfather", id: 1, active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 4, party: "Town", active: "convert", passive: "immunity")
    jr = Role.create(name: "Junior", id: 3, active: "poison")
    u1 = User.create(id: 1, session_id: 123)
    u2 = User.create(id: 2, session_id: 1235)
    u3 = User.create(id: 3, session_id: 1234)
    p1 = Player.create(id: 1, role: gf, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: pr, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    expect(g.players.alive.count).to eql 3
    p1.die!
    p2.die!
    expect(g.players.alive.count).to eql 1
    expect(g.both_heads_dead?).to eql true
  end

  it 'shows that Town wins if Mafia is dead' do
    gf = Role.create(name: "Godfather", id: 1, party: "Mafia", active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 4, party: "Town", active: "convert", passive: "immunity")
    jr = Role.create(name: "Junior", id: 3, party: "Anarchists", active: "poison")
    u1 = User.create(id: 1, session_id: 123)
    u2 = User.create(id: 2, session_id: 1235)
    u3 = User.create(id: 3, session_id: 1234)
    p1 = Player.create(id: 1, role: gf, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: pr, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    expect(g.players.alive.count).to eql 3
    p1.die!
    expect(g.get_winner).to eql "Town"
    p3.die!
    expect(g.players.alive.count).to eql 1
    expect(g.both_heads_dead?).to eql false
    expect(g.get_winner).to eql "Town"
  end

  it 'shows that Mafia wins if Town is dead' do
    gf = Role.create(name: "Godfather", id: 1, party: "Mafia", active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 4, party: "Town", active: "convert", passive: "immunity")
    jr = Role.create(name: "Junior", id: 3, party: "Anarchists", active: "poison")
    u1 = User.create(id: 1, session_id: 123)
    u2 = User.create(id: 2, session_id: 1235)
    u3 = User.create(id: 3, session_id: 1234)
    p1 = Player.create(id: 1, role: gf, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: pr, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    expect(g.players.alive.count).to eql 3
    p2.die!
    expect(g.get_winner).to eql "Mafia"
    p3.die!
    expect(g.players.alive.count).to eql 1
    expect(g.both_heads_dead?).to eql false
    expect(g.get_winner).to eql "Mafia"
  end

  it 'sets default text if newspaper is empty' do
    g = Game.create(id: 1)
    expect(g.avoid_empty_newspaper([])).to eql({role: nil, info_text: "Nothing happened that night."})
  end

  it 'gets the latest news and they are all fails' do
    gf = Role.create(name: "Godfather", id: 5, party: "Mafia", active: "corrupt", passive: "immunity")
    pr = Role.create(name: "President", id: 6, party: "Town", active: "convert", passive: "immunity")
    jr = Role.create(name: "Junior", id: 7, party: "Anarchists", active: "poison")
    u1 = User.create(id: 1, session_id: 123)
    u2 = User.create(id: 2, session_id: 1235)
    u3 = User.create(id: 3, session_id: 1234)
    p1 = Player.create(id: 1, role: gf, changed_party: false, user: u1,  state: "alive")
    p2 = Player.create(id: 2, role: pr, changed_party: false, user: u2,  state: "alive")
    p3 = Player.create(id: 3, role: jr, changed_party: false, user: u3,  state: "alive")
    g = Game.create(id: 1)
    g.add_player(p1)
    g.add_player(p2)
    g.add_player(p3)
    expect(g.players.alive.count).to eql 3
    success = g.calculate_success(1, 2)
    Article.create(game: g, round: 1, committer_id: 1, victim_id: 2, success: success)
    success = g.calculate_success(2, 1)
    Article.create(game: g, round: 1, committer_id: 2, victim_id: 1, success: success)
    Article.create(game: g, round: 2, committer_id: 2, victim_id: 1, success: success)
    expect(g.get_latest_news(1).count).to eql 2
  end
end
