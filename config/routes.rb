Rails.application.routes.draw do
  root 'pages#index'

  namespace :v1 do
    namespace :api do
      resources :airlines, param: :slug
      resources :reviews, only: [:create, :destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
