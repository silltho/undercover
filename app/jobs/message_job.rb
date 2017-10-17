class MessageJob < ApplicationJob
  queue_as :default

  def perform message
    ActionCable.server.broadcast "chat_#{message.game_id}", id: message.id,
      body: message.body, user: message.user
  end
end
