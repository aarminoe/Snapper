class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :user_id, :edit

  belongs_to :user
  has_many :post_likes
  has_many :comments, include_nested_associations: true
end
