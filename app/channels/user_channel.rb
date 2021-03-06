class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end

  def create_game(params)
    new_game = Game.create
    p = create_new_player(new_game, params['nickname'])
    UserChannel.broadcast_to(current_user, type: 'create_game_success', data: new_game.get_game_object)
    p.broadcast_player_updated
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
    nickname = params['nickname']
    UserChannel.broadcast_to(current_user, type: 'wrong_gamecode', data: nil) if game.nil?
    UserChannel.broadcast_to(current_user, type: 'game_full', data: nil) if game.full?
    return if game.nil? || game.full?
    if is_game_running?(game)
      p = Player.where(game: game, user: current_user, codename: nickname).first
      p.reconnect!
      return false if p.nil?
      p.broadcast_player_updated
    elsif game.full?
      return false
    else
      p = Player.create!(game: game, user: current_user, codename: nickname)
      p.broadcast_player_updated
    end

    UserChannel.broadcast_to(current_user, type: 'join_game_success', data: game.get_game_object)
    game.broadcast_game_updated
  end

  protected

  def is_game_running?(game)
    !game.waiting? && !game.finished?
  end

  def create_new_player(game, nickname)
    Player.create!(user: current_user, game_id: game.id, codename: nickname)
  end

  def get_player(game)
    Player.where(user: current_user, game: game)
  end
end
