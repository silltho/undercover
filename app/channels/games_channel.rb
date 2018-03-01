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
    game.started!
    #send first issue to all players with information about who is in the game
    #TODO Anna: think about how to save newspaper in db
    #TODO Tom: maybe just display draft of the newspaper made by artists for prototype
    GamesChannel.broadcast_to(game, type: 'info_phase_ended', data: game)
  end

  def end_info_phase
    game = find_game
    #display fancy stuff because in the backend nothing is really going on
    game.informed!
    GamesChannel.broadcast_to(game, type: 'info_phase_ended', data: game)
  end

  def end_exchange_phase
    game = find_game
    game.exchanged!
    GamesChannel.broadcast_to(game, type: 'exchange_phase_ended', data: game)
    #send newspaper issue to all players with information about who died and stuff
  end

  def use_skill
    game = find_game
    #send possible actions to user and react accordingly.
    game.skills_used!
    GamesChannel.broadcast_to(find_game, type: 'activity_phase_ended', data: find_game)
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
    puts params[:gamecode]
    game = Game.where(code: params[:gamecode])
    console.log(game)
  end
end
