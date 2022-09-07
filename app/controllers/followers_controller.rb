class FollowersController < ApplicationController

    def create
        follower = Follower.create(follower_params)
        if follower.valid?
            render json: follower, status: :created
        else
            render json: { errors: follower.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        follower = Follower.find_by(id:params[:id])
        if follower 
            follower.destroy 
            head :no_content
        else
            render json: { error: 'Follower Not Found' }, status: :not_found
        end
    end

    private

    def follower_params 
        params.permit(:who_followed, :who_followed_avatar_url, :user_id)
    end
end
