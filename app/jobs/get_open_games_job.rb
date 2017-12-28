class GetOpenGamesJob < ApplicationJob
  queue_as :default

  def perform(stream)
    ActionCable.server.broadcast(stream, type: 'get_open_games', data: { games: Game.all })
  end
end
