module Api 
  class ExamsController < ApplicationController
    def index 
      glass = Glass.find(params[:glass_id])
      if glass 
        @students = glass.students.order(full_name: :ASC)
        @params = params
        render 'api/exams/index'
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
        render 'api/exams/index'
      else
        render json: {
          success: false
        }, status: :not_found
      end  
    end  

    def create
      @exam = Grade.new(exam_params)
      if @exam.save 
        render 'api/exams/create'
      else
        render json: { success: false }, status: :bad_request
      end  
    end  

    private
      def exam_params
        params.require(:student).permit(:student_grade, :student_id, :year_id, :type_id, :subject_id)
      end  
  end  
end  