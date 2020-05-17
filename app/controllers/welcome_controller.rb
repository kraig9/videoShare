class WelcomeController < ApplicationController
  def index
    puts "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
    puts session[:user_id]
    if session[:user_id] == nil
      redirect_to '/welcome/scene1'
    else
      @roomID = session[:room_id]
      @roomName = session[:room_name]
      @userID = session[:user_id]
      puts 'hello'
      render :js => "window.location = '/welcome/index'"
    end
  end

  def scene1
  end
end
