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
end
