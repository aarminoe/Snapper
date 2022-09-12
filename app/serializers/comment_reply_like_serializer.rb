class CommentReplyLikeSerializer < ActiveModel::Serializer
  attributes :id, :who_liked, :who_liked_avatar_url, :comment_reply_id

  belongs_to :comment_reply
end
