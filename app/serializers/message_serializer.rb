class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :who_messaged, :who_messaged_avatar_url, :conversation_id, :date

  has_many :message_replies
  belongs_to :conversation
end
