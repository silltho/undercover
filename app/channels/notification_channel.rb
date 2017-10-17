class NotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game]}"
  end
  
  def unsubscribed
  end
end
