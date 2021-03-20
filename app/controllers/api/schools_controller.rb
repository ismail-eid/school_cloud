module Api 
  class SchoolsController < ApplicationController
    def create 
      user = User.find_by(email: params[:school][:user_email])
      if user 
        @school = user.schools.new(name: params[:school][:name], tell: params[:school][:tell], address: params[:school][:address])

        if @school.save 
          render 'api/schools/create'
         else
          render json: {success: false} 
        end  
      else 
        render json: {success: false}   
      end  
    end  

    def show 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)
      user = session.user
      if user 
        @school = user.schools.first
        render '/api/schools/show'
      else 
        render json: {success: false}, status: :not_found  
      end  
    end  

    private 

      def user_params
        params.require(:school).permit(:name, :tell, :address, :user_email)
      end  
  end  
end  