class CommentReplyLikesController < ApplicationController


    def index 
        comment_reply_likes = CommentReplyLike.all 
        render json: comment_reply_likes, include: ['comment', 'post']
    end

    def create 
        comment_reply_like = CommentReplyLike.create(comment_reply_like_params)
        if comment_reply_like.valid?
            render json: comment_reply_like, status: :created 
        else 
            render json: { error: comment_reply_like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        comment_reply_like = CommentReplyLike.find_by(id:params[:id])
        if comment_reply_like 
            comment_reply_like.destroy
            head :no_content
        else
            render json: { error: 'Like Not Found' }, status: :not_found
        end
    end

    private

    def comment_reply_like_params 
        params.permit(:who_liked, :who_liked_avatar_url, :comment_id)
    end


end
