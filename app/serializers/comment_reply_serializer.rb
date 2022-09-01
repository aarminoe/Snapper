class CommentReplySerializer < ActiveModel::Serializer
  attributes :id, :reply, :who_commented, :who_commented_avatar_url, :comment_id

  belongs_to :comment
end
