class RoomController < ApplicationController
    def new
    end

    def create
        roomName = SecureRandom.alphanumeric(8)
        @room = Room.new('room_name' => roomName)
        @room.save
        @user = User.new('room_id' => @room.id, 'username' => params[:username])
        @user.save
        session[:user_id] = @user.id
        session[:room_id] = @room.id
        session[:room_name] = @room.room_name
        send_message @user.username, @room
        redirect_to '/welcome/from_outside_controller'
        return
    end

    def show
        render "/room/index"
        #@room = room.find(params[:id])
    end

    def join
        room_id = Room.where(:room_name => params[:room_name]).ids[0]
        if room_id.nil? then
            head 404
            return
        end
        @room = Room.find(room_id)

        @user = User.new('room_id' => room_id, 'username' => params[:username])
        @user.save
        session[:user_id] = @user.id
        session[:room_id] = @room.id
        session[:room_name] = @room.room_name
        send_message @user.username, @room
        redirect_to '/welcome/from_outside_controller'
    end
end
