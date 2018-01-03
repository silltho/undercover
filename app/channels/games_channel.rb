class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:id])
    stream_for game
  end

  def join_game
  end

  private
  def stream_id
    "game_#{self.current_user}"
  end
end
