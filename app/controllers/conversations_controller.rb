class ConversationsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        conversations = Conversation.all
        render json: conversations, include: ['users','messages.message_replies', 'messages']
    end

    def create 
        conversation = Conversation.create(conversation_params)
        if conversation.valid?
            render json: conversation, status: :created
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def conversation_params 
        params.permit(:sender, :sender_avatar_url, :receiver, :receiver_avatar_url)
    end

end
