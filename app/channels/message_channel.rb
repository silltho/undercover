class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_test"
  end

  def unsubscribed
  end
end
