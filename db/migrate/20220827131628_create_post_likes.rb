class CreatePostLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :post_likes do |t|
      t.string :who_liked 
      t.string :who_liked_avatar_url
      t.integer :post_id
      t.timestamps
    end
  end
end
