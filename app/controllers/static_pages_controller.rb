class StaticPagesController < ApplicationController
  # app controller
  def App 
    
    token = cookies.signed[:dugsi_session_token]
    if session 
      @school = Session.find_by(token: token).user.schools.first.name
      render 'App'
    end  
  end  

  # landing page controller
  def Home 
    render 'Home'
  end  
end
