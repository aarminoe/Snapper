class ApplicationController < ActionController::API
    include ActionController::Cookies
    #include ::ActionController::Serialization
    before_action :authorized
    def authorized
        return render json:{error: 'Not Authorized'}, status: :unauthorized unless session.include? :user_id
    end
end
