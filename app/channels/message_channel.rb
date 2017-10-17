class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "undercover_chat"
  end

  def unsubscribed
  end
end
