class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_for find_game
  end

=begin
  def join_game
    game = find_game
    game.users << current_user
    data = game.attributes
    data["players"] = game.users.to_a
    GamesChannel.broadcast_to(find_game, type: 'join_game', data: data)
  end
=end

  def unsubscribed
    GamesUsers.where(game_id: params[:id]).where(user_id: current_user.id).destroy_all
    if GamesUsers.where(game_id: params[:id]).length === 0
      destroy_game
    end
  end


  def destroy_game
    game = find_game
    ActionCable.server.broadcast('dashboard', type: 'game_destroyed', data: game)
    game.destroy
  end

  def initialize_game
    game = find_game
    game.initializing!
    ActionCable.server.broadcast('dashboard', type: 'game_started', data: game)
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
