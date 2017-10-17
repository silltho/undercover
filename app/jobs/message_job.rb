class MessageJob < ApplicationJob
  queue_as :default

  def perform message
    ActionCable.server.broadcast "game_#{message.game_id}", id: message.id,
      body: message.body, user: message.user
  end
end
