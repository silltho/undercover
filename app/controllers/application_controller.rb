class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :signed_in

  def app
    @current_user = {
        name: 'User1234',
        id: '123'
    }
  end

  def require_login
    redirect_to root_path unless signed_in?
  end

  def authenticate
  	redirect_to :login unless signed_in?
  end

  def current_user
  	@current_user = User.find(cookies.signed[:user_id]) if cookies.signed[:user_id]
  end

  def signed_in?
  	# converts current_user to a boolean by negating the negation
  	!!current_user
  end
end
