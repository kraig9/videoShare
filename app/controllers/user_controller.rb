class UserController < ApplicationController
    skip_before_action :verify_authenticity_token
    def new
        @user = User.new(params[:id])
        
        @user.save
        redirect_to @user
    end
    
    def create
        @user = User.new("balls")
        @user.save
        redirect_to @user
    end
    
    def show
        @userall = User.all
        render "user/timestamp"
        #@user = User.find(params[:id])
    end
    
    def timestamp
        @user_room = User.select(params[:room_id])
        @timestamp = params[:timestamp]
        @action = params[:action]
        print @user_room
        render 'user/show'
    end
end