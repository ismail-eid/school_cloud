module Api 
  class StudentsController < ApplicationController
    def create 
      @student = Student.new(student_params)

      if @student.save 
        render 'api/students/create' 
      else
        render json: {
          success: false
        }
      end  
    end  

    def update 
     student_object = {}
      if params[:student][:student_id]
       student_object[:student_id] = params[:student][:student_id]
      end
      if params[:student][:full_name]
       student_object[:full_name] = params[:student][:full_name]
      end  
      if params[:student][:gender]
       student_object[:gender] = params[:student][:gender]
      end
      if params[:student][:phone]
       student_object[:phone] = params[:student][:phone]
      end
      if params[:student][:address]
       student_object[:address] = params[:student][:address]
      end
      if params[:student][:birthday]
       student_object[:birthday] = params[:student][:birthday]
      end
      if params[:student][:parent_id]
       student_object[:parent_id] = params[:student][:parent_id]
      end
      if params[:student][:photo]
       student_object[:photo] = params[:student][:photo]
      end
      
  
      @student = Student.find(params[:student][:id])

      if @student && @student.update(student_object) 
        render 'api/students/show'
      else
        render json: {success: false}  
      end  
    end  

    def index 
      glass = Glass.find(params[:glass])

      if glass
        @students = glass.students.order(full_name: :ASC)
        render '/api/students/index'
      else
       render json: {
          success: false
        }, status: :not_found  
      end  
    end  

    def show 
      @student = Student.find(params[:id])
      if @student
        render 'api/students/show'
      else
        render json: {
          success: false
        }, status: :not_found
      end  
    end  

    def student_params
      params.require(:student).permit(:student_id, :full_name, :gender, :phone, :address, :birthday, :parent_id, :glass_id, :photo)
    end  
  end  
end  