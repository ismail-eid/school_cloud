module Api
  class GlassesController < ApplicationController
    def create 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)
      user = session.user
      school = user.schools.first

      if school 
       @glass = school.glasses.new(class_params)

       if @glass.save 
        render 'api/glasses/create'
       else
        render json: {success: false}, status: :bad_request
       end 
      else
        render json: {success: false}, status: :bad_request
      end  

    end  

    def index 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)
      user = session.user
      school = user.schools.first

      if school 
        @glasses = school.glasses
        render 'api/glasses/index'
      else
        render json: {success: false}, status: :not_found
      end  
    end  

    def show 
      @glass = Glass.find(params[:id])

      if @glass 
        render 'api/glasses/show'
      else
        render json: {
          success: false
        }
      end  
    end  

    private
      
      def class_params 
        params.require(:new_class).permit(:class_name)
      end  
  end  
end  
