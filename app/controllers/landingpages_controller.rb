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

   # if current_user
      #redirect_to app_url

    #end

    #unless current_user
   #   render 'landingpages/login_form'
    #end
    respond_to do |format|
      format.js
    end

  end

end
