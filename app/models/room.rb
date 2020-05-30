class Room < ApplicationRecord
    has_many :users

    def set_expiration_timestamp(room_id)
        #set expiration time to 4 hours after the room creation time
        Room(id).expiration_time = Room(id).created_at + (3600 * 4)
    end

    def timestamp_Check(room_id)
        if Time.now = Room(id).expiration_time
            return true
        else
            return false
        end
    end
    #attr_accessor :room_name
end