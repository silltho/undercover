class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = find_game
    stream_for game
  end

  def initialize_game
    game = current_user.game
    game.initializing!
    game.broadcast_game_updated
  end

  def start_game
    game = current_user.game
    game.started!
    #send first issue to all players with information about who is in the game
    #TODO Anna: think about how to save newspaper in db
    #TODO Tom: maybe just display draft of the newspaper made by artists for prototype
    game.broadcast_game_updated
  end

  def end_info_phase
    game = current_user.game
    #display fancy stuff because in the backend nothing is really going on
    game.informed!
    game.broadcast_game_updated
  end

  def end_exchange_phase
    game = current_user.game
    game.exchanged!
    game.broadcast_game_updated
    #send newspaper issue to all players with information about who died and stuff
  end

  def use_skill
    game = current_user.game
    #send possible actions to user and react accordingly.
    game.skills_used!
    game.broadcast_game_updated
  end

  def finish_game
    game = current_user.game
    game.finish!
    #save all the stuff to a statistics table
    game.broadcast_game_updated
  end

  def reset_game
    #just for debugging
    game = current_user.game
    game.reset!
  end

  private
  def find_game
    Game.where(code: params[:gamecode], aasm_state: 'waiting').first
  end
end
