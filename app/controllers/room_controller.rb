class RoomController < ApplicationController
    def new
        # roomID = SecureRandom.alphanumeric(8)
        # @user = User.new('room_id' => roomID, 'username' => params[:username])
        # @room = Room.new(roomID)
        # @room.save
        # @user.save
        # session[:user_id] = @user.id
        # session[:room_id] = @room.id
        # redirect_to 'welcome/index'
    end
    
    def create
        roomName = SecureRandom.alphanumeric(8)
        @room = Room.new('room_name' => roomName)
        @user = User.new('room_id' => @room, 'username' => params[:username])
        @room.save
        @user.save
        cookies[:user_id] = @user.id
        cookies[:room_id] = @room.id
        cookies[:room_name] = @room.room_name
        render plain: '/welcome/index'
        return
    end
    
    def show
        render "welcome/index"
        #@room = room.find(params[:id])
    end
    
    def join
       @room = Room.where(:room_name => params[:room_name])
       @user = User.new('room' => @room, 'username' => params[:username])
       @user.save
       cookies[:user_id] = @user.id
       cookies[:room_id] = @room.id
       render 'welcome/index'
    end
end
