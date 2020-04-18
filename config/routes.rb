Rails.application.routes.draw do
  get 'video/index'
  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
 
  root 'welcome#index'
  
  get 'welcome/scene1'
  
  resources :user
  resources :room
  
  post 'user/timestamp'
  post 'user/videochange'
  post 'user/chatpost'
  post 'room/join'
end
