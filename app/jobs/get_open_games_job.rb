class GetOpenGamesJob < ApplicationJob
  queue_as :default

  def perform(user)
    UserChannel.broadcast_to(user, type: 'get_open_games', data:  { games: Game.all })
  end
end
