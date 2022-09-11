class FollowSerializer < ActiveModel::Serializer
  attributes :id, :followed, :followed_avatar_url, :user_id

  belongs_to :user
end
