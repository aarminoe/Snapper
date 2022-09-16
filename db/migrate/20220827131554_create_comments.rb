class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.string :comment 
      t.string :who_commented
      t.string :who_commented_avatar_url
      t.integer :post_id
      t.boolean :edit
      t.string :date
      t.timestamps
    end
  end
end
