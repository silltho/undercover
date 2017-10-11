Rails.application.routes.draw do
  resources :messages
  resources :users
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match '/logout', to: 'sessions#destroy', via: [:get, :post], as: 'logout'

  get '/app', to: 'application#app'

  root to: 'landingpages#index'
end
