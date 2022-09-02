class CommentRepliesController < ApplicationController

    def create
        comment_reply = CommentReply.create(comment_reply_params)
        if comment_reply.valid?
            render json: comment_reply, status: :created 
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def comment_reply_params 
        params.permit(:reply, :who_commented, :who_commented_avatar_url, :comment_id)
    end
end
