class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:game]}"
  end
  
  def unsubscribed
  end
end
