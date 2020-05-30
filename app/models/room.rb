class Room < ApplicationRecord
    has_many :users

    def set_expiration_timestamp(room_id)
        #set expiration time to 4 hours after the room creation time
        Room(id).expiration_time = Room(id).created_at + (3600 * 4)
    end

    def is_timestamp_expired(room_id)
        return Time.now >= Room(id).expiration_time ? true : false
    end

    def update_expiration_timestamp(room_id)
        #if there are still users in the room update the expiration timestamp to add another hour
        Room(id).expiration_time + 3600
    end

    def start_check_expiration_thread
        Thread.new do
            while not is_timestamp_expired do
                puts "Room: "
                sleep 1.hours
            end
        end
    end
    #attr_accessor :room_name
end