class PostLikesController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index 
        post_likes = PostLike.all 
        render json: post_likes 
    end
end
