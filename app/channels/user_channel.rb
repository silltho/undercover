class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_#{self.current_user.id}"
    get_userinfo
    get_open_games
  end

  def get_userinfo
    ActionCable.server.broadcast("user_#{self.current_user.id}", type: 'get_userinfo', data: self.current_user)
  end

  def get_open_games
    GetOpenGamesJob.perform_later("user_#{self.current_user.id}")
  end
end
