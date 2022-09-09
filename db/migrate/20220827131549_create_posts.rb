class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title 
      t.string :image_url
      t.integer :user_id
      t.boolean :edit
      t.timestamps
    end
  end
end
