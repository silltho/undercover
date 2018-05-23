class GameWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(game_id, round)
    g = Game.find(game_id)
    g.time_is_up
  end

end

