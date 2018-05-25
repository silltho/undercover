class GamesChannel < ApplicationCable::Channel
  def subscribed
    find_game
    stream_for @game
  end

  def unsubscribed
    if @game.aasm_state == 'waiting'
      @game.players.delete(current_player)
      @game.broadcast_game_updated
    else
      current_player.disconnect!
    end
  end

  def initialize_game
    @game.reload
    @game.initializing!
    @game.broadcast_game_updated
  end

  def start_game
    @game.reload
    finish_phase("start_game")
    if phase_finished?("start_game")
      @game.started!
      @game.broadcast_game_updated
    end
  end

  def end_info_phase
    @game.reload
    finish_phase("end_info_phase")
    if phase_finished?("end_info_phase")
      @game.broadcast_all_players
      @game.informed!
      finish_game if @game.is_game_over?
      @game.broadcast_game_updated
    end
  end

  def use_skill(params)
    @game.reload
    @game.use_skill(current_player.id, params['victim'])
    finish_phase("use_skill")
    all_skills_used if phase_finished?("use_skill")
  end

  def draw_game
    ActionLog.create(player: current_player,  game: @game, round: @game.round, action: "draw") if current_player.alive?
    finish_game if @game.is_game_over?
  end

  def finish_phase(phase)
    # phase = @game.aasm_state
    ActionLog.create(player: current_player,  game: @game, round: @game.round, action: phase) if current_player.alive?
    # send(phase.to_sym) if phase_finished?(phase)
  end

  def phase_finished?(phase)
    finished = ActionLog.where(game: @game).where(round: @game.round).where(action: phase).group(:player).maximum(:id).count == @game.players.alive.count
    current_player.broadcast_waiting_for_players unless finished
    finished
  end

  def all_skills_used
    @game.reload
    @game.skills_used!
    @game.broadcast_information_updated
    @game.broadcast_game_updated
  end

  def finish_game
    @game.reload
    @game.finish!
    @game.broadcast_game_updated
  end

  private

  def find_game
    @game = Game.where(code: params[:gamecode]).first
  end

  def current_player
    Player.where(game: @game, user: current_user).first
  end
end
