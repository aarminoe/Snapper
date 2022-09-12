class CommentReplySerializer < ActiveModel::Serializer
  attributes :id, :reply, :who_commented, :who_commented_avatar_url, :comment_id, :edit

  belongs_to :comment

  has_many :comment_reply_likes
end
