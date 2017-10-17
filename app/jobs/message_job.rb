class MessageJob < ApplicationJob
  queue_as :default

  def perform message
    ActionCable.server.broadcast "undercover_chat", id: message.id,
      body: message.body
  end
end
