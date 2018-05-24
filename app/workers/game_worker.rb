class GameWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform
    Game.all.each do |g|
      started = g.updated_at
      now = Time.now
      g.time_is_up if TimeDifference.between(started, now).in_seconds >= 30 && g.aasm_state != 'finished'
    end
  end
end

