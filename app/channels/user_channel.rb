class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    current_user.game.broadcast_game_updated unless current_user.game.nil?
  end

  def create_game
    new_game = Game.create
    new_game.add_player(current_user)
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: new_game.get_game_object)
  end

  def leave_game (params)
    Player.where(game_id: params['id']).where(session_id: current_user.session_id).update(game_id: nil, role_id: nil, codename: nil)
    game = Game.find(params['id'])
    game.players.delete(current_user)
    UserChannel.broadcast_to(current_user, type: 'leave_game_success', data: game.get_game_object)
    game.broadcast_game_updated
    #destroy game if no players left
  end

  def join_game (params)
    game = Game.where(code: params['gamecode'], aasm_state: 'waiting').first
    game.add_player(current_user) unless game.players.include? current_user
    UserChannel.broadcast_to(current_user, type: 'join_game_success', data: game.get_game_object)
    game.broadcast_game_updated
  end
end
