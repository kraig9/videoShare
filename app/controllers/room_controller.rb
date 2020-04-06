class RoomController < ApplicationController
    def new
        @room = Room.new(params[:id])
        
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
