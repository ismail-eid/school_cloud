module Api
  class ParentusersController < ApplicationController
    def create 
      @parent_user = Parentuser.new(parentusers_params)

      if @parent_user.save 
        render json: {
          username: @parent_user.username
        }
      else
        render json: {
          success: false
        }
      end  
    end  

    private
      def parentusers_params
        params.require(:user).permit(:username, :password, :parent_id)
      end 
  end  
end  