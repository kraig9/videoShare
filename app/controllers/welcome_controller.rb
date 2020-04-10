class WelcomeController < ApplicationController
  def index
    @room = Room.find(2)
    @user = User.find(1)
  end
  
  def scene1
  end
end
