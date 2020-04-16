class RoomController < ApplicationController
    def new
        roomID = SecureRandom.alphanumeric(8)
        @user = User.new()
        @room = Room.new(roomID)
        @room.save
        redirect_to @room
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
end
