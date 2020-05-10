class WelcomeController < ApplicationController
  def index
    puts "INDEX"
    puts cookies[:user_id]
    if not cookies.key?("user_id")
      render :js => "window.location = '/welcome/scene1'"
    else
      @roomID = cookies[:room_id]
      @roomName = cookies[:room_name]
      @userID = cookies[:user_id]
      render 'welcome/index'
    end
  end

  def scene1
  end
end
