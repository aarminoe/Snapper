class PostLikesController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index 
        post_likes = PostLike.all 
        render json: post_likes 
    end

    def create 
        post_like = PostLike.create(post_like_params)
        if post_like.valid?
            render json: post_like, status: :created 
        else 
            render json: { error: post_like.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        post_like = PostLike.find_by(id:params[:id])
        if post_like 
            post_like.destroy
            head :no_content
        else
            render json: { error: 'Like Not Found' }, status: :not_found
        end
    end

    private

    def post_like_params 
        params.permit(:who_liked, :who_liked_avatar_url, :post_id)
    end

end
