class GamesChannel < ApplicationCable::Channel
  def subscribed
    find_game
    stream_for @game
  end

  def unsubscribed
    if @game.aasm_state == 'waiting'
      @game.players.delete(current_player)
      @game.broadcast_game_updated
    end
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
    finish_game if @game.is_game_over?
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
    all_skills_used if @game.all_users_clicked?(@game.round)
  end

  def finish_phase(params)
    phase = params['phase']
    ActionLog.create(player: params['player'],  game: @game, round: @game.round, action: phase)
    send(phase.to_sym) if phase_finished?(phase)
  end

  def phase_finished?(action_name)
    ActionLog.where(game: @game).where(round: @game.round).where(action: action_name).group(:player).maximum(:id).count == @game.players.alive.count
  end

  def all_skills_used
    @game.reload
    @game.skills_used!
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
    @game = Game.where(code: params[:gamecode]).first
  end

  def current_player
    Player.where(game: @game, user: current_user).first
  end
end
