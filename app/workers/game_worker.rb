class GameWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(game_id, round)
    g = Game.find(game_id)
    g.time_is_up if g.round == round && TimeDifference.between(g.updated_at, Time.now).in_seconds >= 27
  end

end

