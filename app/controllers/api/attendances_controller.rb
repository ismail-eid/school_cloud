module Api 
  class AttendancesController < ApplicationController
    def index 
      glass = Glass.find(params[:glass_id])
      if glass 
        @students = glass.students.order(full_name: :ASC)
        @params = params
        render 'api/attendances/index'
      else 
        render json: {
          success: false
        }, status: :not_found  
      end  
    end 
    
    def create 
      @attendance = Attendance.new(attendance_params)

      if @attendance.save 
        render 'api/attendances/create'
      else
        render json: { success: false }, status: :bad_request  
      end  
    end  

    def destroy
      token = cookies.signed[:dugsi_session_token]
      session = Session.find_by(token: token)

      if session
        attendance = Attendance.find(params[:id])

        if attendance && attendance.destroy 
          render json: { success: true } 
        end  
      else
        render json: { success: false }
      end  
    end  

    private
      def attendance_params
        params.require(:student).permit(:student_id, :year_id, :month_id, :day_id)
      end  
  end
end  