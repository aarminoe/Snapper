class CommentsController < ApplicationController

    def create
        comment = Comment.create(comment_params)
        if comment.valid?
            render json: comment, status: :created 
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def comment_params
        params.permit(:comment, :who_commented, :who_commented_avatar_url, :post_id)
    end
end
