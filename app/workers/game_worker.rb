class GameWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker
  sidekiq_options retry: false

  def perform(game_id)
    g = Game.find(game_id)
    g.time_is_up unless g.aasm_state == 'finished'
  end

end

