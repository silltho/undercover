class GamesChannel < ApplicationCable::Channel
  def subscribed
    find_game
    stream_for @game
  end

  def initialize_game
    @game.reload
    @game.initializing!
    @game.broadcast_game_updated
  end

  def start_game
    @game.reload
    @game.started!
    @game.broadcast_game_updated
  end

  def end_info_phase
    @game.reload
    @game.informed!
    @game.broadcast_game_updated
  end

  def end_exchange_phase
    @game.reload
    @game.exchanged!
    @game.broadcast_game_updated
  end

  def use_skill(params)
    @game.reload
    @game.use_skill(current_player.id, params['victim'])
  end

  def all_skills_used
    @game.reload
    @game.skills_used!
    finish_game if @game.is_game_over?
    @game.broadcast_information_updated(@game.round)
    @game.broadcast_game_updated
  end

  def finish_game
    @game.reload
    @game.finish!
    @game.broadcast_game_updated
  end

  def reset_game
    @game.reload
    @game.reset!
  end

  private

  def find_game
    @game = Game.where(code: params[:gamecode], aasm_state: 'waiting').first
  end

  def current_player
    Player.where(game: @game, user: current_user).first
  end
end
