class GetOpenGamesJob < ApplicationJob
  queue_as :default

  def perform(stream)
    ActionCable.server.broadcast(stream, games: Game.all.to_json)
  end
end
