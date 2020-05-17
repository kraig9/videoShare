class RoomChannel < ApplicationCable::Channel
    def subscribed
        stream_for room
    end

    def connect
    end

    def unsubscribed
        # Any cleanup needed when channel is unsubscribed
    end

    def room
        Room.find(params[:room_id])
    end
end
