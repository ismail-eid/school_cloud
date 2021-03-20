json.glasses do 
  json.array! @glasses do |glass|
    json.id glass.id 
    json.class_name glass.class_name
    json.number_of_students glass.students.count
  end  
end  