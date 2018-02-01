class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_for find_game
  end

=begin
  def join_game
    game = find_game
    game.users << current_user
    data = game.attributes
    data["players"] = game.users.to_a
    GamesChannel.broadcast_to(find_game, type: 'join_game', data: data)
  end
=end

  def unsubscribed
    GamesUsers.where(game_id: params[:id]).where(user_id: current_user.id).destroy_all
    if GamesUsers.where(game_id: params[:id]).length === 0
      destroy_game
    end
  end


  def destroy_game
    game = find_game
    ActionCable.server.broadcast('dashboard', type: 'game_destroyed', data: game)
    game.destroy
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
