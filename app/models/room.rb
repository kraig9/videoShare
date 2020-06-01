class Room < ApplicationRecord
    has_many :users

    def set_expiration_timestamp
        #set expiration time to 4 hours after the room creation time
        self.expiration_time = self.created_at + 4.hours
        self.save
    end

    def is_timestamp_expired
        return Time.now.utc >= self.expiration_time ? true : false
    end

    def update_expiration_timestamp
        #if there are still users in the room update the expiration timestamp to add another hour
        self.expiration_time += 1.hours
        self.save
    end

    def start_check_expiration_thread
        #thread that checks if the current time is after the expiration time
        Thread.new do
            loop do
                user_still_in = false
                while not is_timestamp_expired do
                    sleep 1.hours
                end
                User.where(room_id: self.id).each do |user|
                    if user.connected == false
                        user.delete
                        user.save
                    else
                        user_still_in = true
                    end
                end
                if user_still_in
                    update_expiration_timestamp
                else
                    self.delete
                    self.save
                end
                break if not user_still_in
            end
        end
    end
    #attr_accessor :room_name
end