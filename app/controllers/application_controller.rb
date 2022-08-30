class ApplicationController < ActionController::API
    include ActionController::Cookies
    #include ::ActionController::Serialization
    before_action :authorize

    def authorize
        return render json:{error: 'Not Authorized'}, status: :unauthorized unless session.include? :user_id
    end
end
