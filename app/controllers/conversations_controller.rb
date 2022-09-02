class ConversationsController < ApplicationController
    skip_before_action :authorize, only: [:create, :index, :show]

    def index
        conversations = Conversation.all
        render json: conversations, include: ['users','messages.message_replies']
    end

end
