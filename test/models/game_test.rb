require 'test_helper'
require 'aasm/rspec'

class GameTest < ActiveSupport::TestCase
  test "the truth" do
    assert true
  end

  test "game is waiting after create" do
    game = Game.new
    expect(game).to have_state(:waiting)
  end
end
