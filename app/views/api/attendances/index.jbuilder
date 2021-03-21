json.students do 
  json.array! @students do |student|
    json.id student.id
    json.student_id student.student_id
    json.full_name student.full_name
    json.attended student.attendances.where(:year_id => @params[:year_id], :month_id => @params[:month_id], :day_id => params[:day_id]).first && true || false
  end  
end  