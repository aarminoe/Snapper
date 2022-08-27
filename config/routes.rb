Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  get "/me", to: "users#show"

  resources :users
end
