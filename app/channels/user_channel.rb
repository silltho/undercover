class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    get_userinfo
  end

  def get_userinfo
    UserChannel.broadcast_to(current_user, type: 'get_userinfo', data: current_user)
  end
end
