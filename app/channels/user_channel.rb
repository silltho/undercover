class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_#{self.current_user.id}"
    get_open_games
  end

  def get_open_games
    GetOpenGamesJob.perform_later(self.current_user)
  end
end
