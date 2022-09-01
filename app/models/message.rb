class Message < ApplicationRecord
    
    belongs_to :conversation

    has_many :message_replies
end
