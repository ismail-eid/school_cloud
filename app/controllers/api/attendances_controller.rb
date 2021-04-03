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

    def show 
      parent = Parent.find(params[:parent_id])

      if parent
        @students = parent.students.order(full_name: :ASC)
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

    private
      def attendance_params
        params.require(:student).permit(:student_id, :year_id, :month_id, :day_id)
      end  
  end
end  