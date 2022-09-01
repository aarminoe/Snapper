class Post < ApplicationRecord

    belongs_to :user

    has_many :post_likes
    has_many :comments 
    has_many :comment_replies, through: :comments
end
