class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag_text

  has_many :posts
end
