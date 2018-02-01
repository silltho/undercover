class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    get_userinfo
    GetOpenGamesJob.perform_later(current_user)
    get_current_game
  end

  def get_userinfo
    UserChannel.broadcast_to(current_user, type: 'get_userinfo', data: current_user)
  end

  def get_current_game
    current_game = Game.joins(:users).where(aasm_state: 'waiting' ,users: {id: current_user.id}).first
    UserChannel.broadcast_to(current_user, type: 'get_current_game', data: current_game)
  end
end
