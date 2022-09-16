class PostTagsController < ApplicationController

    def create 
        post_tag = PostTag.create(post_tag_params)
        if post_tag.valid?
            render json: post_tag, status: :created 
        else
            render json: { errors: post_tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def post_tag_params
        params.permit(:post_id, :tag_id)
    end
end
