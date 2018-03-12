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
    player = Player.new
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
end
