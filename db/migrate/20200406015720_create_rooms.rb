class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :room_name
      t.timestamps
      t.time :expiration_time
      #t.string :room_name
    end
  end
end