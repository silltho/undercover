class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = find_game
    stream_for game
  end

  def initialize_game
    game = current_user.game
    game.reload
    game.initializing!
    game.broadcast_game_updated
  end

  def start_game
    game = current_user.game
    game.reload
    game.started!
    game.broadcast_game_updated
  end

  def end_info_phase
    game = current_user.game
    game.reload
    game.informed!
    game.broadcast_game_updated
  end

  def end_exchange_phase
    game = current_user.game
    game.reload
    game.exchanged!
    game.broadcast_game_updated
  end

  def use_skill(params)
    game = current_user.game
    game.reload
    game.use_skill(current_user.id, params['victim'])
  end

  def all_skills_used
    game = current_user.game
    game.reload
    game.skills_used!
    game.broadcast_information_updated(game.round)
    game.broadcast_game_updated
  end

  def finish_game
    game = current_user.game
    game.reload
    game.finish!
    game.broadcast_game_updated
  end

  def reset_game
    game = current_user.game
    game.reload
    game.reset!
  end

  private
  def find_game
    Game.where(code: params[:gamecode], aasm_state: 'waiting').first
  end
end
