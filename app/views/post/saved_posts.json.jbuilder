json.posts @posts do |post|
  json.title post.title
  json.content post.content
  json.gifs post.gifs
end