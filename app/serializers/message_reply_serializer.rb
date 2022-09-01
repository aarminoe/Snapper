class MessageReplySerializer < ActiveModel::Serializer
  attributes :id, :message, :who_messaged, :who_messaged_avatar_url, :message_id

  belongs_to :message
end
