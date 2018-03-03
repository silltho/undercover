class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    UserChannel.broadcast_to(current_user, type: 'game_updated', data: current_user.game.get_game_object) if current_user.game.not.null
  end

  def create_game
    new_game = Game.create
    new_game.players << current_user
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: new_game)
  end

  def leave_game (params)
    Player.where(game_id: params['id']).where(session_id: current_user.session_id).update(game_id: nil, role_id: nil, codename: nil)
    game = Game.find(params['id'])
    game.get_game_object
    UserChannel.broadcast_to(current_user, type: 'leave_game_success', data: game)
    #destroy game if no players left
  end

  def get_userinfo
    UserChannel.broadcast_to(current_user, type: 'get_userinfo', data: current_user)
  end

  def get_current_game
    current_game = Game.where(aasm_state: 'waiting' , player: {id: current_user.id}).first
    UserChannel.broadcast_to(current_user, type: 'get_current_game', data: current_game)
  end
end
