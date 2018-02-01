class LandingpagesController < ApplicationController
  def index
    render layout: "application"
  end

  def gameplay
    render layout: "application"
  end

  def characters
    render layout: "application"
  end

  def team
    render layout: "application"
  end

  def show
  end

  def login_form
    if current_user
      redirect_to app_url
    end

    unless current_user
      render 'landingpages/login_form'

      # link_to "Connect With Facebook", "/auth/facebook"
      link_to "Connect With Google", "/auth/google_oauth2"
    end
  end
end
