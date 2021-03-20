json.student do
  json.student_id @student.student_id
  json.full_name @student.full_name
  json.phone @student.phone
  json.class_name @student.glass.class_name
  json.gender @student.gender
  json.address @student.address
  json.birthday @student.birthday
  json.photo url_for(@student.photo) if @student.photo.attached?
  json.parent_name @student.parent.full_name
  json.parent_phone @student.parent.phone
  json.parent_id @student.parent.id
end  