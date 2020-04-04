class UserController < ApplicationController
    def new
        
    end
    
    def create
        @user = User.new("balls")
        
        @user.save
        redirect_to @user
    end
    
    def show
        @user = User.find(params[:id])
    end
end
