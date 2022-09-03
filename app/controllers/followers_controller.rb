class FollowersController < ApplicationController

    def create
        follower = Follower.create(follower_params)
        if follower.valid?
            render json: follower, status: :created
        else
            render json: { errors: follower.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def follower_params 
        params.permit(:who_followed, :who_followed_avatar_url, :user_id)
    end
end
