class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        users = User.all 
        render json: users, include: ['posts', 'followers', 'posts.post_likes', 'posts.comments.comment_replies', 'posts.comments.comment_likes','post.comments', 'conversations', 'conversations.messages', 'follows']
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user, include: ['posts', 'followers', 'posts.comments', 'post.post_likes', 'posts.comment.comment_likes', 'posts.comments.comment_replies','conversations', 'conversations.messages', 'follows']
    end

    def create 
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        user = User.find_by(id:params[:id])
        if user
            user.update(user_params)
            session[:user_id] = user.id
            render json: user 
        else
            render json: { error: 'User Not Found' }, status: :not_found
        end
    end

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar_url, :bio)
    end
end
