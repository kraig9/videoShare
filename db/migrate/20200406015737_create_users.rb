class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
        t.belongs_to :room
        t.string :username
        t.timestamps
        t.boolean :connected
    end
  end
end
