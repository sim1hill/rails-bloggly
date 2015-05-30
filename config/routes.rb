Rails.application.routes.draw do
 post '/gifs', to: 'post#gifs'
 get '/gifs', to: 'post#gifs'
 root 'post#index'
end
