class MessageRepliesController < ApplicationController

    def create
        message_reply = MessageReply.create(message_reply_params)
        if message_reply.valid?
            render json: message_reply, status: :created 
        else 
            render json: { errors: message_reply.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def message_reply_params
        params.permit(:reply, :who_replied, :who_replied_avatar_url, :message_id)

end
