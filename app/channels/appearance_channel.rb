class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "logged_in_list"
  end
end