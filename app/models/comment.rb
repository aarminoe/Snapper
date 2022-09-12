class Comment < ApplicationRecord
    belongs_to :post 
    has_many :comment_replies, dependent: :destroy
    has_many :comment_likes, dependent: :destroy
end
