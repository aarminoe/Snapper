class User < ApplicationRecord

    has_many :posts, dependent: :destroy
    has_many :comments, through: :posts, dependent: :destroy
    has_many :comment_replies, through: :comments
    has_many :comment_likes, through: :comments
    has_many :followers
    has_many :follows
    has_many :user_conversations
    has_many :conversations, through: :user_conversations
    has_many :messages, through: :conversations

    

    has_secure_password

    validates :username, uniqueness: true, presence: true, length: {within: 3..24}
    validates :password, presence: true, confirmation: true, length: {minimum: 8}
    validates :avatar_url, presence: true, allow_blank: false
    validates :bio, presence: true
end
