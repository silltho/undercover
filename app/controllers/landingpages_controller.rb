class LandingpagesController < ApplicationController
  def index
    render layout: "application"
    puts @current_user
    @current_user = current_user
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
    respond_to do |format|
      format.js
    end
  end
end
