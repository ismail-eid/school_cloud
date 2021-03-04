Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#Home'             # Home page [server side]

  get '/signup'            => 'static_pages#Home' # Signup page [client side]
  get '/login'             => 'static_pages#Home'  # Login page [client side]
  get '/about'             => 'static_pages#Home'  # About page [client side]

  namespace :api do 
    # USERS 
    post '/users'          => 'users#create'

    # SESSIONS
    post '/sessions'       => 'sessions#create'
    get '/authenticated'   => 'sessions#authenticated'
    delete '/sessions'     => 'sessions#destroy'

    # SCHOOLS
    post '/schools'        => 'schools#create'
    get '/schools'         => 'schools#show'

  end  

  get '/app'               => 'static_pages#App' # App page [server side]
  get '/app/classes'       => 'static_pages#App' # classes page [client side]
end
