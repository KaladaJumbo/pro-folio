Rails.application.routes.draw do
  resources :projects
  resources :skills
  resources :users
  post "users/:username", to: "users#login"
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
