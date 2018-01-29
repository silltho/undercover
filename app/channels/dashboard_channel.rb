class DashboardChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'dashboard'
    GetOpenGamesJob.perform_later(current_user)
  end

  def create_game(params)
    game = Game.create(user: current_user, title: params['title'])
    DashboardChannel.broadcast_to('dashboard', type: 'game_created', data: game)
  end
end
