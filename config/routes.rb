Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#Home'             # Home page [server side]
  
  get '/' => 'static_pages#Home'
  get '/signup' => 'static_pages#Home' # Signup page [client side]
  get '/login' => 'static_pages#Home'  # Login page [client side]
  get '/about' => 'static_pages#Home'  # About page [client side]

  get '/app' => 'static_pages#App'
end
