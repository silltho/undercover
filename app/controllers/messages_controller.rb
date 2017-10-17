class MessagesController < ApplicationController
   def create
    message = Message.create!(message_params)
    render json: message.to_json
  end
end
