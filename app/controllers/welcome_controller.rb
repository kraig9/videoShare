class WelcomeController < ApplicationController

  def is_authenticated
    return session[:user_id] != nil
  end

  def from_outside_controller
    puts 'OUTSIDE CONTROLLER'
    if is_authenticated()
      render plain: '/welcome/index'
    else
      render plain: '/welcome/scene1'
    end
  end

  def index
    puts "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
    puts session[:user_id]
    if is_authenticated()
      @roomID = session[:room_id]
      @roomName = session[:room_name]
      @userID = session[:user_id]
      puts 'hello'
      render '/welcome/index'
    else
      redirect_to '/welcome/scene1'
    end
  end



  def redirect
    redirect_to '/welcome/scene1'
  end

  def scene1
  end
end
