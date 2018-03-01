class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    get_userinfo
    GetOpenGamesJob.perform_later(current_user)
    get_current_game
  end

  def create_game
    new_game = Game.create
    new_game.players << current_user
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: new_game)
  end

  def get_userinfo
    UserChannel.broadcast_to(current_user, type: 'get_userinfo', data: current_user)
  end

  def get_current_game
    current_game = Game.where(aasm_state: 'waiting' , player: {id: current_user.id}).first
    UserChannel.broadcast_to(current_user, type: 'get_current_game', data: current_game)
  end
end
