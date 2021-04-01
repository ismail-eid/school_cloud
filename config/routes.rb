Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#Home'             # Home page [server side]

  get '/signup'                                => 'static_pages#Home' # Signup page [client side]
  get '/login'                                 => 'static_pages#Home'  # Login page [client side]
  get '/about'                                 => 'static_pages#Home'  # About page [client side]

  namespace :api do 
    # USERS 
    post '/users'                              => 'users#create'

    # SESSIONS    
    post '/sessions'                           => 'sessions#create'
    get '/authenticated'                       => 'sessions#authenticated'
    delete '/sessions'                         => 'sessions#destroy'

    # SCHOOLS
    post '/schools'                            => 'schools#create'
    get '/schools'                             => 'schools#show'

    # CLASSES
    post '/glasses'                            => 'glasses#create'
    get '/glasses'                             => 'glasses#index'
    get '/glasses/:id'                         => 'glasses#show'

    # STUDENTS
    post '/students'                           => 'students#create'
    get '/students'                            => 'students#index'
    get '/students/:id'                        => 'students#show'
    put '/students'                            => 'students#update'
    get '/student'                             => 'students#find'

    # EXAMS
    get '/exams'                               => 'exams#index'
    post '/exams'                              => 'exams#create'

    # ATTENDANCE
    get '/attendances'                         => 'attendances#index'
    post '/attendances'                        => 'attendances#create'

    #  PARENTS
    get '/parents'                             => 'parents#show'    
    post '/parents'                            => 'parents#create'

    # PARENT USERS
    post '/parentusers'                        => 'parentusers#create'
    get '/parentusers'                         => 'parentusers#authenticated'

  end  
  
  # APP
  get '/app'                                   => 'static_pages#App' # App page [server side]
  get '/app/classes'                           => 'static_pages#App' # classes page [client side]
  get '/app/classes/:id'                       => 'static_pages#App'
  get '/app/classes/:class_name/students/:id'  => 'static_pages#App'
  get '/app/exams'                             => 'static_pages#App'
  get '/app/attendances'                       => 'static_pages#App'
  get '/app/payments'                          => 'static_pages#App'
  get '/app/student'                           => 'static_pages#App'
  get '/app/parents'                           => 'static_pages#App'

  # PARENT
  get '/parents'                               => 'static_pages#Parent'
end
