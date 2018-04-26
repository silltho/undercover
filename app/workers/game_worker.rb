class GameWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(game_id)
    game = Game.find(game_id)
    state = game.aasm_state
    game.s
    game.informed! if state == phase
    game.exchanged! if state == phase
    game.skills_used! if state == phase
  end
end
