class RoomChannel < ApplicationCable::Channel
  # identified_by :room_id
  # stream_for room

  def subscribed
    # stream_from "some_channel"
    # stream_from User.where('room_id = ?', params[:room_id])
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
