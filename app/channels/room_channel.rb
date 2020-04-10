class RoomChannel < ApplicationCable::Channel
  # identified_by :room_id
  # stream_for room

  def subscribed
    # stream_from "some_channel"
    # stream_from User.where('room_id = ?', params[:room_id])
    puts 'print statement inside room_channel/subscribed method'
    stream_for room
  end
  
  def connect
    self.room_id = User.find_by(id: cookies.encrypted[:user_id])[:room_id]
    puts 'first print statement inside room_channel/connect method'
    puts cookies.encrypted[:user_id]
    puts self.room_id
    puts 'second print statement inside room_channel/connect method'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def room
    Room.find(params[:room_id])
  end
  
  
end
