class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_id
    puts 'test'
    puts params
    join_game
  end

  def join_game
    game = Game.find(params[:id])
    game.users << current_user
    data = game.attributes
    data["players"] = game.users.to_a
    ActionCable.server.broadcast(stream_id, type: 'join_game', data: data)
  end

  def unsubscribed
    GamesUsers.where(game_id: params[:id]).where(user_id: current_user.id).destroy_all
    if GamesUsers.where(game_id: params[:id]).length === 0
      destroy_game
    end
  end

  def destroy_game
    Game.destroy(params[:id])
    ActionCable.server.broadcast(stream_id, type: 'destroy_game', data: params[:id])
  end

  private
  def stream_id
    "game_#{params[:id]}"
  end
end
