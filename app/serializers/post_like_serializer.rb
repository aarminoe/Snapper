class PostLikeSerializer < ActiveModel::Serializer
  attributes :id, :who_liked, :who_liked_avatar_url, :post_id

  belongs_to :post

  
end
