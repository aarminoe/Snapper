class Post < ApplicationRecord

    belongs_to :user
    
    has_many :post_tags
    has_many :tags, through: :post_tags
    has_many :post_likes, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :comment_replies, through: :comments, dependent: :destroy
    has_many :comment_likes, through: :comments, dependent: :destroy
end
