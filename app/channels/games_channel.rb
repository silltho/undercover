class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_for find_game
  end

  def unsubscribed
    game = find_game
    if game.waiting?
      GamesUsers.where(game_id: params['id']).where(user_id: current_user.id).destroy_all
      game = Game.find(params['id'])
      ActionCable.server.broadcast('dashboard', type: 'player_left_game', data: game)
    end
  end

  def initialize_game
    game = find_game
    game.initializing!
    ActionCable.server.broadcast('dashboard', type: 'game_started', data: game)
  end

  def reset_game
    game = find_game
    game.reset!
  end

  private
  def find_game
    puts params[:id]
    game = Game.find(params[:id])
  end
end
