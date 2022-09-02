class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :bio

  has_many :posts, include_nested_associations: true
  has_many :post_likes, through: :posts
  has_many :comment_replies
  has_many :conversations, include_nested_associations: true
  has_many :followers
end
