class MessageReplySerializer < ActiveModel::Serializer
  attributes :id, :reply, :who_replied, :who_replied_avatar_url, :message_id, :date

  belongs_to :message
end
