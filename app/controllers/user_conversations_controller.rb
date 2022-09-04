class UserConversationsController < ApplicationController

    def create
        user_conversation = UserConversation.create(user_conversation_params)
        if user_conversation.valid?
            render json: user_conversation, status: :created
        else 
            render json: { errors: user_conversation.errors.full_messages }, status: :unprocessable_entity
        end

    end

    private

    def user_conversation_params
        params.permit(:user_id, :conversation_id)
    end
    
end
