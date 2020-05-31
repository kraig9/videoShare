class Room < ApplicationRecord
    has_many :users

    def set_expiration_timestamp
        #set expiration time to 4 hours after the room creation time
        self.expiration_time = self.created_at + (3600 * 4)
    end

    def is_timestamp_expired
        puts "in the timestamp expired method"
        puts self
        puts Time.now.utc
        puts self.expiration_time.utc
        return Time.now.utc >= self.expiration_time ? true : false
    end

    def update_expiration_timestamp
        #if there are still users in the room update the expiration timestamp to add another hour
        self.expiration_time + 3600
    end

    def start_check_expiration_thread
        Thread.new do
            puts "before loop"
            while true do
                if is_timestamp_expired do
                    if users_connected
                        update_expiration_timestamp
                    else
                    end
                else
                    sleep 10.seconds
                end
            end
            while not is_timestamp_expired do
                #puts "Room: " + self + " has not expired yet."
                puts "in loop"
            end
            puts "out of loop"
            #puts "Room: " + self + " has expired!"
        end
    end
end