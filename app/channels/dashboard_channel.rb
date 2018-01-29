class DashboardChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'dashboard'
    GetOpenGamesJob.perform_later(current_user)
  end

  def create_game(params)
    game = Game.create(user: current_user, title: params['title'])
    data = game.attributes
    data["players"] = game.users.to_a
    ActionCable.server.broadcast('dashboard', type: 'game_created', data: data)
  end
end
