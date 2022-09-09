class CommentRepliesController < ApplicationController

    def create
        comment_reply = CommentReply.create(comment_reply_params)
        if comment_reply.valid?
            render json: comment_reply, status: :created 
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        comment_reply = CommentReply.find_by(id:params[:id])
        if comment_reply 
            comment_reply.update(comment_reply_params)
            render json: comment_reply 
        else
            render json: { error: 'Comment Reply Not Found' }, status: :not_found
        end
    end

    def destroy
        comment_reply = CommentReply.find_by(id:params[:id])
        if comment_reply 
            comment_reply.destroy
            head :no_content
        else 
            render json: { error: 'Reply Not Found' }, status: :not_found
        end
    end
        
    private

    def comment_reply_params 
        params.permit(:reply, :who_commented, :who_commented_avatar_url, :comment_id)
    end
end
