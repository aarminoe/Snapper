class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :bio

  has_many :posts, include_nested_associations: true
  has_many :conversations, include_nested_associations: true
  has_many :followers
  has_many :follows
end
