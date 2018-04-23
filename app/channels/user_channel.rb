class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    # TODO: find new fix
    #current_user.game.broadcast_game_updated unless current_user.game.nil?
  end

  def create_game
    new_game = Game.create
    p = create_new_player(new_game)
    #new_game.players << p
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: new_game.get_game_object)
  end

  def leave_game(params)
    game = Game.find(params['id'])
    player = Player.where(game: game, user: current_user).destroy_all
    game.players.delete(player)
    UserChannel.broadcast_to(current_user, type: 'leave_game_success', data: game.get_game_object)
    game.broadcast_game_updated
  end

  def join_game(params)
    game = Game.where(code: params['gamecode']).first
    p = Player.where(game: game, user: current_user).first_or_create
    p.save!
    UserChannel.broadcast_to(current_user, type: 'join_game_success', data: game.get_game_object)
    game.broadcast_game_updated
    p.broadcast_player_updated if game.aasm_state != 'waiting'
  end

  protected

  def create_new_player(game)
    Player.create!(user: current_user, game_id: game.id)
  end

  def get_player(game)
    Player.where(user: current_user, game: game)
  end
end
