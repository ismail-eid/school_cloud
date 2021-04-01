json.students do
  json.array! @parent_user.parent.students do |student|
    json.id  student.id
    json.student_id student.student_id
    json.full_name student.full_name
  end  
end  