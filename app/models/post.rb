class Post < ApplicationRecord

    belongs_to :user

    has_many :post_likes, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :comment_replies, through: :comments, dependent: :destroy
end
