class RoomController < ApplicationController
    def new
        roomID = SecureRandom.alphanumeric(8)
        @user = User.new('room_id' => roomID, 'username' => params[:username])
        @room = Room.new(roomID)
        @room.save
        @user.save
        session[:user_id] = @user.id
        session[:room_id] = @room.id
        redirect_to 'welcome/index'
    end
    
    def create
        @room = Room.new()
        @room.save
        redirect_to @room
    end
    
    def show
        render "welcome/index"
        #@room = room.find(params[:id])
    end
    
    def join
       @room = Room.get(:id => params[room_id])
       @user = User.new('room_id' => params[room_id], 'username' => params[:username])
       @user.save
       session[:user_id] = @user.id
       session[:room_id] = @room.id
       redirect_to 'welcome/index'
    end
end
