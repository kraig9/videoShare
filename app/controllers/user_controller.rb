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
        render "/user/show"
        #@user = User.find(params[:id])
    end

    def timestamp
        timestamp = params[:timestamp]
        user_action = params[:user_action]
        current_room = Room.find(session[:room_id])
        puts 'print statement from the user_controller/timestamp method'
        # @sumOfAll = @user_room + @timestamp + @action
        message = { :timestamp => timestamp, :user_action => user_action, :current_user => session[:user_id] }.to_json()
        RoomChannel.broadcast_to current_room, content: message
        # ActionCable.server.broadcast "room_channel", content: message
        return head :ok
    end

    def videochange
        user_action = params[:user_action]
        current_room = Room.find(session[:room_id])
        video_id = params[:video_id]
        puts 'print statement from the user_controller/videochange method'
        message = {
            :video_id => video_id,
            :user_action => user_action,
            :current_user => session[:user_id]
        }.to_json()
        RoomChannel.broadcast_to current_room, content: message
        # ActionCable.server.broadcast "room_channel", content: message
        return head :ok
    end

    def chatpost
        sender = User.find(session[:user_id]).username
        user_action = params[:user_action]
        chat = params[:chat]
        current_room = Room.find(session[:room_id])
        time = Time.now.to_i
        message = {
            :chat => chat,
            :user_action => user_action,
            :id => session[:user_id],
            :name => sender,
            :time => time
        }.to_json()
        RoomChannel.broadcast_to current_room, content: message
    end

    def leaveroom
        user = User.find(session[:user_id])
        room = Room.find(session[:room_id])
        send_message user.username, room, true
        user.destroy
        if User.where(room_id: session[:room_id]).length == 0
            room.destroy
        end
        reset_session
        render :plain => '/welcome/home'
    end
end