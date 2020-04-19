class Room < ApplicationRecord
    has_many :users
    #attr_accessor :room_name
end