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

    def authenticated 
      @parent_user = Parentuser.find_by(username: params[:username])
      if @parent_user and BCrypt::Password.new(@parent_user.password) == params[:password]
        render 'api/parentusers/authenticated'
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