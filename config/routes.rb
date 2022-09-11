Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: "users#show"
  get '/posts', to: 'posts#index'
  

  resources :conversations do 
    resources :users 
    resources :messages do
      resources :message_replies
    end
  end

  resources :user_conversations

  resources :users do
    resources :posts do
      resources :post_likes
      resources :comments do
        resources :comment_replies
      end
    end
    resources :conversations
    resources :followers
    resources :follows
  end

end
