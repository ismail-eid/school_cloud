module Api 
  class UsersController < ApplicationController
    def create 
      @user = User.new(user_params)

      if @user.save 
        render 'api/users/create', status: :created
      else 
        render json: {
          success: false
        }
      end  
    end  

    private 
      
      def user_params
        params.require(:user).permit(:full_name, :email, :password)
      end  
  end  
end

