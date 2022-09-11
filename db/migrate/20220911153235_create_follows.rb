class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.string :followed
      t.string :followed_avatar_url 
      t.integer :user_id
      t.timestamps
    end
  end
end
