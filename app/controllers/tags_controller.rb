class TagsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index 
        tags = Tag.all 
        render json: tags 
    end

    def create
        tag = Tag.create(tag_params)
        if tag.valid? 
            render json: tag, status: :created 
        else 
            render json: { errors: tag.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private 

    def tag_params 
        params.permit(:tag_text)
    end
    
end
