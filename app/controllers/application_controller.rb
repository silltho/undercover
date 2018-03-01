class ApplicationController < ActionController::Base
  layout false
  protect_from_forgery with: :exception
  helper_method :current_user
  before_action :set_user

  def set_user
    @current_user = Player.find_or_create_by(session_id: session.id)
    cookies.signed[:session_id] = session.id
  end

  def current_user
    @current_user
  end
end
