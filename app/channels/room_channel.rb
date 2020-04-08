class RoomChannel < ApplicationCable::Channel
  identified_by :room_id
  def subscribed
    # stream_from "some_channel"
    stream_for User.where('room_id = ?', params[:room_id])
  end
  
  def connect
    self.room_id = User.find_by(id: cookies.encrypted[:user_id])[:room_id]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
