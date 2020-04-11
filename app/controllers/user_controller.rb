class UserController < ApplicationController
    # skip_before_action :verify_authenticity_token
    def new
        user = User.new(params[:id])
        
        user.save
        redirect_to user
    end
    
    def create
        user = User.new("balls")
        user.save
        redirect_to user
    end
    
    def show
        @userall = User.all
        render "user/show"
        #@user = User.find(params[:id])
    end
    
    def timestamp
        #@user_room = User.select("room_id = " + params[:id])
        #user_room = User.where('room_id = ?', params[:room_id])
        timestamp = params[:timestamp]
        user_action = params[:user_action]
        current_room = Room.find(params[:room_id])
        puts 'print statement from the user_controller/timestamp method'
        # @sumOfAll = @user_room + @timestamp + @action
        message = { :timestamp => timestamp, :user_action => user_action, :current_user => params[:id] }.to_json()
        RoomChannel.broadcast_to current_room, content: message
        # ActionCable.server.broadcast "room_channel", content: message
        return head :ok
    end
    
    def videochange
        user_action = params[:user_action]
        current_room = Room.find(params[:room_id])
        video_id = params[:video_id]
        puts 'print statement from the user_controller/videochange method'
        message = { :video_id => video_id, :user_action => user_action, :current_user => params[:id] }.to_json()
        RoomChannel.broadcast_to current_room, content: message
        # ActionCable.server.broadcast "room_channel", content: message
        return head :ok
    end
end