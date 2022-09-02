class MessageReplySerializer < ActiveModel::Serializer
  attributes :id, :reply, :who_replied, :who_replied_avatar_url, :message_id

  belongs_to :message
end
