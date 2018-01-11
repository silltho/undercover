class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_from stream_id
    get_userinfo
    get_open_games
  end

  def get_userinfo
    ActionCable.server.broadcast(stream_id, type: 'get_userinfo', data: self.current_user)
  end

  def get_open_games
    GetOpenGamesJob.perform_later(stream_id)
  end

  def create_game(params)
    game = Game.create(user: current_user, title: params['title'])
    ActionCable.server.broadcast(stream_id, type: 'create_game', data: game)
  end

  private
  def stream_id
    "user_#{self.current_user}"
  end
end
