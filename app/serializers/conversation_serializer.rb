class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :sender, :sender_avatar_url, :receiver, :receiver_avatar_url

  has_many :users 
  has_many :messages, include_nested_associations: true  
end
