class WelcomeController < ApplicationController
  def index
    puts "INDEX"
    puts cookies.key?("user_id")
    puts cookies[:user_id]
    if not cookies.key?("user_id")
      puts 'hi'
      render '/welcome/scene1'
      # render :js => "window.location = '/welcome/scene1'"
    else
      puts 'hi'
      @roomID = cookies[:room_id]
      @roomName = cookies[:room_name]
      @userID = cookies[:user_id]
      render 'welcome/index'
    end
  end

  def scene1
  end
end
