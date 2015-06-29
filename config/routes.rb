Rails.application.routes.draw do
 post '/gifs', to: 'post#create'
 get '/gifs', to: 'post#gifs'
 get '/saved-posts', to: 'post#saved_posts'
 root 'post#index'
end
