class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_for find_game
  end

  def unsubscribed
    game = find_game
    if game.waiting?
      GamesUsers.where(game_id: params['id']).where(session_id: current_user.session_id).update(game_id: nil, role_id: nil, codename: nil)
      game = Game.find(params['id'])
      ActionCable.server.broadcast('dashboard', type: 'player_left_game', data: game)
    end
  end

  def initialize_game
    game = find_game
    game.initializing!
    ActionCable.server.broadcast('dashboard', type: 'player_started_game', data: game)
  end

  def start_game
    game = find_game
    game.start!
    #send first issue to all players with information about who is in the game
    #TODO Anna: think about how to save newspaper in db
    #TODO Tom: maybe just display draft of the newspaper made by artists for prototype
  end

  def exchanging_phase
    game = find_game
    #display fancy stuff because in the backend nothing is really going on
    game.exchanging
  end

  def skill_using_phase
    game = find_game
    #send possible actions to user and react accordingly.
    game.use_skills!
  end

  def informing_phase
    game = find_game
    game.informing!
    #send newspaper issue to all players with information about who died and stuff
  end

  def finish_game
    game = find_game
    game.finish!
    #save all the stuff to a statistics table
  end

  def reset_game
    #just for debugging
    game = find_game
    game.reset!
  end

  private
  def find_game
    puts params[:id]
    game = Game.find(params[:id])
  end
end
