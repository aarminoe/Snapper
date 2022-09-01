class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :who_commented, :who_commented_avatar_url, :post_id

  has_many :comment_replies
  belongs_to :post
end
