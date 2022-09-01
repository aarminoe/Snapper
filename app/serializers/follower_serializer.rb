class FollowerSerializer < ActiveModel::Serializer
  attributes :id, :who_followed, :who_followed_avatar_url, :user_id

  belongs_to :user
end
