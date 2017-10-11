class SessionsController < ApplicationController
  def create
    auth = request.env['omniauth.auth']
    @identity = Identity.find_or_create_omniauth(auth)

    if signed_in?
      # logged-in user tries to link different identitiy
      if @identity.user != current_user
        @identity.user = current_user
        @identity.save
      end
    else
      # user is not logged in
      if @identity.user.present?
      # login user with existing identity
      @current_user = @identity.user
      cookies.signed[:user_id] = @identity.user.id
      else
      # create new user
      @user = User.find_or_create_omniauth(auth)
      @identity.user = @user
      @identity.save
      @current_user = @user
      end
    end
    redirect_to app_path
  end

  def destroy
    cookies.signed[:user_id] = nil
    @current_user = nil
    redirect_to root_path
  end
end