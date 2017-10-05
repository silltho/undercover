Rails.application.routes.draw do
  resources :users
  match '/auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match '/logout', to: 'sessions#destroy', via: [:get, :post], as: 'logout'

  root to: 'landingpages#index'
end
