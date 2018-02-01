class DashboardChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'dashboard'
  end

  def create_game(params)
    game = Game.create(title: params['title'], user: current_user)
    game.users << current_user
    ActionCable.server.broadcast('dashboard', type: 'player_created_game', data: game)
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: game)
  end

  def join_game(params)
    game = Game.find(params['id'])
    #validierung (max 8 player, keine doppelten einträge)
    game.users << current_user
    ActionCable.server.broadcast('dashboard', type: 'player_joined_game', data: game)
    UserChannel.broadcast_to(current_user, type: 'join_game_success', data: game)
  end

  def leave_game(params)
    GamesUsers.where(game_id: params['id']).where(user_id: current_user.id).destroy_all
    game = Game.find(params['id'])
    ActionCable.server.broadcast('dashboard', type: 'player_left_game', data: game)
    if GamesUsers.where(game_id: params[:id]).length === 0
      remove_game
    end
  end

  def remove_game
    game = find_game
    game.destroy
    ActionCable.server.broadcast('dashboard', type: 'player_removed_game', data: game)
  end
end
