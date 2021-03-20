json.student do
json.id @student.id
json.student_id @student.student_id
json.full_name @student.full_name
json.phone @student.phone 
json.parent_phone @student.parent.phone
end