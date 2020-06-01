class WelcomeController < ApplicationController
    def from_outside_controller
        if is_authenticated()
            render plain: '/room/index'
        else
            render plain: '/welcome/home'
        end
    end

    def redirect
        redirect_to '/welcome/home'
    end

    def home
        if is_authenticated()
            redirect_to '/room/index'
        else
            render '/welcome/home'
        end
    end
end
