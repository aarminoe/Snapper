class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :message
      t.string :who_messaged 
      t.string :who_messaged_avatar_url
      t.integer :conversation_id
      t.timestamps
    end
  end
end
