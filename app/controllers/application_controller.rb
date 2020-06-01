class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    def send_message(username, userroom, is_leave_message=false)
        time = Time.now.to_i
        chat = "#{username} joined the couch!"
        puts is_leave_message
        if is_leave_message
            chat = "#{username} left the couch!"
        end
        message = {
            :chat => chat,
            :user_action => 'chat',
            :id => 0,
            :name => 'SERVER INFO',
            :time => time
        }.to_json()
        puts message
        RoomChannel.broadcast_to userroom, content: message
    end
    
    def is_authenticated
        user_check = User.where(id: session[:user_id])
        if user_check.length == 0
            reset_session
            return false
        end
        return true
        #return session[:user_id] != nil
    end
end
