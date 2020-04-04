Rails.application.routes.draw do
  get 'video/index'
  get 'welcome/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
 
  root 'welcome#scene1'
  
  get 'welcome/scene1'
  
  resources :user
end
