class RoomChannel < ApplicationCable::Channel
    def subscribed
        stream_for room
        user_sub = User.find(params[:user_id])
        user_sub.connected = true
        user_sub.save
    end

    def connect
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
        user_sub = User.find(params[:user_id])
        user_sub.connected = false
        user_sub.save
    end

    def room
        Room.find(params[:room_id])
    end
end
