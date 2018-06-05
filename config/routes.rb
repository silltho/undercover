Rails.application.routes.draw do
  resources :games
  resources :messages
  resources :users
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match '/logout', to: 'sessions#destroy', via: [:get, :post], as: 'logout'
  get '/app', to: 'application#app'

  # Landing Page
  get '/gameplay', to: 'landingpages#gameplay'
  get '/characters', to: 'landingpages#characters'
  get '/team', to: 'landingpages#team'
  get '/handbook', to: 'landingpages#handbook'

  root to: 'landingpages#index'
  get '*path' => redirect('/')
end
