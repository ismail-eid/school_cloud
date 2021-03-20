json.students do 
  json.array! @students do |student|
    json.id student.id 
    json.student_id student.student_id
    json.full_name student.full_name
    json.math student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 1).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 1).first.student_grade

    json.biology student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 2).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 2).first.student_grade

    json.chemistry student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 3).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 3).first.student_grade

    json.physics student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 4).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 4).first.student_grade

    json.geography student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 5).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 5).first.student_grade

    json.history student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 6).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 6).first.student_grade

    json.arabic student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 7).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 7).first.student_grade

    json.english student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 8).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 8).first.student_grade

    json.somali student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 9).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 9).first.student_grade

    json.islamic_study student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 10).first && student.grades.where(:year_id => @params[:year_id], :type_id => @params[:type_id], :subject_id => 10).first.student_grade
  end  
end  