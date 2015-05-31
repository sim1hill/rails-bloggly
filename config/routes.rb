Rails.application.routes.draw do
 post '/gifs', to: 'post#create'
 get '/gifs', to: 'post#gifs'
 root 'post#index'
end
