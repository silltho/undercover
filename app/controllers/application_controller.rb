class ApplicationController < ActionController::Base
  layout false
  protect_from_forgery with: :exception
  helper_method :current_user
  before_action :set_user

  def set_user
    session[:foo] = 'bar'

    if session.id.nil?
      redirect_to root_path
      flash[:notice] = "You do not have a session id!"
    else
      @current_user = User.find_or_create_by(session_id: session.id)
      cookies.signed[:session_id] = session.id
    end
  end

  def current_user
    @current_user = User.where(session_id: cookies.signed[:session_id]).first
  end
end
