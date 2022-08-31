class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    def index
        users = User.all 
        render json: users, include: ['posts']
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user, include: ['posts']
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

    private 

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar_url, :bio)
    end
end
