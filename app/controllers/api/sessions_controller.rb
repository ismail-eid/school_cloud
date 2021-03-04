module Api 
  class SessionsController < ApplicationController
    def create 
      @user = User.find_by(email: params[:user][:email])

      if @user and BCrypt::Password.new(@user.password) == params[:user][:password]
        session = @user.sessions.create
        cookies.permanent.signed[:dugsi_session_token] = {
          value: session.token,
          httponly: true
        }

        render 'api/sessions/create', status: :created
      else
        render json: {
          success: false
        }, status: :bad_request  
      end  
    end  

    def authenticated 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)

      if session 
        @user = session.user
        render 'api/sessions/authenticated', status: :ok
      else 
        render json: {
          authenticated: false
        }
      end  
    end  

    def destroy 
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)

      if session and session.destroy
        rener json: {
          success: true
        } 
      end  
    end  
  end  
end  