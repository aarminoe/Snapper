class CommentsController < ApplicationController

    def create
        comment = Comment.create(comment_params)
        if comment.valid?
            render json: comment, status: :created 
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        comment = Comment.find_by(id:params[:id])
        if comment
            comment.update(comment_params)
            render json: comment 
        else
            render json: { error: 'Comment Not Found' }, status: :not_found
        end
    end

    def destroy
        comment = Comment.find_by(id:params[:id])
        if comment
            comment.destroy
            head :no_content
        else
            render json: { error: 'Comment Not Found' }, status: :not_found
        end
    end

    private

    def comment_params
        params.permit(:comment, :who_commented, :who_commented_avatar_url, :post_id, :edit)
    end
end
