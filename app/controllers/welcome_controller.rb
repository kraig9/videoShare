class WelcomeController < ApplicationController
    def from_outside_controller
        puts 'OUTSIDE CONTROLLER'
        if is_authenticated()
            puts 'rendering room/index'
            render plain: '/room/index'
        else
            puts 'rendering welcome/home'
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
