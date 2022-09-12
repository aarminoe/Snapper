class CommentReply < ApplicationRecord
    belongs_to :comment

    has_many :comment_reply_likes
end
