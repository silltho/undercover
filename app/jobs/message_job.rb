class MessageJob < ApplicationJob
  queue_as :default

  def perform message
    ActionCable.server.broadcast "chat_test", id: message.id,
      body: message.body
  end
end
