class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :who_commented, :who_commented_avatar_url, :post_id, :edit, :date

  has_many :comment_replies
  has_many :comment_likes
  belongs_to :post
end
