class WelcomeController < ApplicationController
  def index
    if session.key?("current_id")
      @room = Room.find(session[:current_id])
      @user = User.find(1)
    end
  end
  
  def scene1
  end
end
