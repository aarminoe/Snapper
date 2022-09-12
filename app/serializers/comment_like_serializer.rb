class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :who_liked, :who_liked_avatar_url, :comment_id

  belongs_to :comment
end
