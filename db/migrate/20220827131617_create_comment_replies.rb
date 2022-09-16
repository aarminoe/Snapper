class CreateCommentReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :comment_replies do |t|
      t.string :reply
      t.string :who_commented
      t.string :who_commented_avatar_url
      t.integer :comment_id
      t.boolean :edit
      t.string :date
      t.timestamps
    end
  end
end
