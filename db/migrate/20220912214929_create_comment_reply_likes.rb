class CreateCommentReplyLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :comment_reply_likes do |t|
      t.string :who_liked 
      t.string :who_liked_avatar_url
      t.integer :comment_reply_id
      t.timestamps
    end
  end
end
