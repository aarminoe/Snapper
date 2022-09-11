class FollowsController < ApplicationController

    def index
        follows = Follow.all
        render json: follows
    end

    def create
        follow = Follow.create(follow_params)
        if follow.valid?
            render json: follow, status: :created 
        else
            render json: { errors: follow.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        follow = Follow.find_by(id:params[:id])
        if follow 
            follow.destroy 
            head :no_content
        else
            render json: { error: 'Follow Not Found' }, status: :not_found
        end
    end

    private

    def follow_params 
        params.permit(:followed, :followed_avatar_url, :user_id)
    end
end
