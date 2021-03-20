class StaticPagesController < ApplicationController
  # app controller
  def App 
    
    token = cookies.signed[:dugsi_session_token]
    session = Session.find_by(token: token)

    if session 
      @school = session.user.schools.first.name
      render 'App'
    else 
      @school = 'Dugsi Cloud'
      render 'App'  
    end  
  end  

  # landing page controller
  def Home 
    render 'Home'
  end  
end
