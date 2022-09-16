class MessagesController < ApplicationController

    def create
        message = Message.create(message_params)
        if message.valid?
            render json: message, status: :created 
        else 
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def message_params 
        params.permit(:message, :who_messaged, :who_messaged_avatar_url, :conversation_id, :date)
    end
end

