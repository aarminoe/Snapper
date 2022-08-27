class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.string :sender 
      t.string :sender_avatar_url 
      t.string :receiver
      t.string :receiver_avatar_url
      t.timestamps
    end
  end
end
