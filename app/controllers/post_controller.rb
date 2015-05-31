class PostController < ApplicationController
  skip_before_action :verify_authenticity_token
  

  def index
  end

  def create
    binding.pry
    @post = Post.create(params)
  end

  def gifs
    searchterm = params[:q]
    split_string = searchterm.split(" ")
    if split_string.length > 1
      slug = split.string.join("+")
    else
      slug = searchterm
    end
    response = HTTParty.get("http://api.giphy.com/v1/gifs/search?q=#{slug}&api_key=dc6zaTOxFJmzC")
    @mappedurls = response["data"].map do |gif|
      gif["images"]["fixed_height"]["url"]
    end
    respond_to do |format|
      format.json
    end 
  end
end
