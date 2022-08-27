class CreateFollowers < ActiveRecord::Migration[7.0]
  def change
    create_table :followers do |t|
      t.string :who_followed 
      t.string :who_followed_avatar_url
      t.timestamps
    end
  end
end
