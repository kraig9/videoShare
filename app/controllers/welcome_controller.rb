class WelcomeController < ApplicationController

  def is_authenticated
    return session[:user_id] != nil
  end

  def from_outside_controller
    puts 'OUTSIDE CONTROLLER'
    if is_authenticated()
      render plain: '/room/index'
    else
      render plain: '/welcome/home'
    end
  end

  def index
    puts session[:user_id]
    if is_authenticated()
      @roomID = session[:room_id]
      @roomName = session[:room_name]
      @userID = session[:user_id]
      puts 'hello'
      render '/room/index'
    else
      redirect_to '/welcome/home'
    end
  end

  def redirect
    redirect_to '/welcome/home'
  end

  def scene1
  end
end
