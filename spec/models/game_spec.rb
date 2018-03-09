require 'rails_helper'
require 'aasm/rspec'

#RSpec.describe Game, type: :model do
describe "stub_model(Game)" do
  let(:game) do
    stub_const Game, id: 5
  end

  it "stubs :id" do
    game.id.should eql(5)
  end

  it "is valid with valid attributes" do
    expect(Game.new).to be_valid
  end

  it "has a valid game code" do
    #expect(Game.new.code.length).to_be equal_to(4)
  end

  it "is in waiting state after creating" do
    expect(game).to have_state(:waiting)
  end

  it "is in initialized state after initiailzing" do
    expect(game.initializing!).to have_state(:initialized)
  end
end
