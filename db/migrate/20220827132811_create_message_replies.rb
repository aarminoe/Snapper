class CreateMessageReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :message_replies do |t|
      t.string :message 
      t.string :who_messaged
      t.string :who_messaged_avatar_url
      t.integer :message_id
      t.timestamps
    end
  end
end
