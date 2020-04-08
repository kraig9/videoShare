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
        user_room = User.where('room_id = ?', params[:room_id])
        timestamp = params[:timestamp]
        action = params[:action]
        # @sumOfAll = @user_room + @timestamp + @action
        message = { :timestamp => timestamp, :action => action }.to_json()
        RoomChannel.broadcast_to(@room_id, message)
    end
end