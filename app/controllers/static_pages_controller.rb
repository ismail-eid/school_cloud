class StaticPagesController < ApplicationController
  # app controller
  def App 
    render 'App'
  end  

  # landing page controller
  def Home 
    render 'Home'
  end  
end
