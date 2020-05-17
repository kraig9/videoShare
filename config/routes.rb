Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'welcome#redirect'
  get '/video/index'
  get '/welcome/index'
  get '/welcome/scene1'
  get '/welcome/from_outside_controller'

  resources :user
  resources :room

  post '/user/timestamp'
  post '/user/videochange'
  post '/user/chatpost'
  post '/room/join'
  post '/user/leaveroom'
end
