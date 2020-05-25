class WelcomeController < ApplicationController
  def from_outside_controller
    puts 'OUTSIDE CONTROLLER'
    if is_authenticated()
      puts 'rendering room/index'
      render json: {location: '/room/index'}
    else
      puts 'rendering welcome/home'
      render json: {location: '/welcome/home'}
    end
  end

  def redirect
    redirect_to '/welcome/home'
  end

  def scene1
  end
end
