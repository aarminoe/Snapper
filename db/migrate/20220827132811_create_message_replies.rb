class CreateMessageReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :message_replies do |t|
      t.string :reply 
      t.string :who_replied
      t.string :who_replied_avatar_url
      t.integer :message_id
      t.string :date
      t.timestamps
    end
  end
end
