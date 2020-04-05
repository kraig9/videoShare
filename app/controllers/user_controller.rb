class UserController < ApplicationController
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
        render "welcome/index"
        #@user = User.find(params[:id])
    end
end
