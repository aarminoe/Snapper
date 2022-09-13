class CommentLikesController < ApplicationController

    def index 
        comment_likes = CommentLike.all 
        render json: comment_likes 
    end

    def create 
        comment_like = CommentLike.create(comment_like_params)
        if comment_like.valid?
            render json: comment_like, status: :created 
        else 
            render json: { error: comment_like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        comment_like = CommentLike.find_by(id:params[:id])
        if comment_like 
            comment_like.destroy
            head :no_content
        else
            render json: { error: 'Like Not Found' }, status: :not_found
        end
    end

    private

    def comment_like_params 
        params.permit(:who_liked, :who_liked_avatar_url, :comment_id)
    end

end
