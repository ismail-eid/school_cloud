module Api  
  class ParentsController < ApplicationController
    def create 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)
      
      render json: {
        success: 'not session'
      } if !session

      school = session.user.schools.first
      
      @parent = school.parents.new(parent_params)
      if @parent.save 
        render 'api/parents/create'
      else
        render json: {
          success: false
        }  
      end  
    end  

    def show 
      if params[:full_name]
        @parent = Parent.find_by(full_name: params[:full_name])
        if @parent 
          render 'api/parents/show'
        else
          render json: { success: false }  
        end  
      elsif  params[:phone]
        @parent = Parent.find_by(phone: params[:phone])
        if @parent 
          render 'api/parents/show'
        else
          render json: { success: false }, status: :not_found  
        end  
      else
        render json: { success: false }, status: :not_found
      end  
    end 

    def parent_params
      params.require(:parent).permit(:full_name, :phone)
    end  
  end  
end  
