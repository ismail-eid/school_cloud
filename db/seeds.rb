# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

years = Year.create([
  {school_year: '2017'},
  {school_year: '2018'},
  {school_year: '2019'},
  {school_year: '2020'},
  {school_year: '2021'}
])

months = Month.create([
  {school_month: 'Jan'},
  {school_month: 'Feb'},
  {school_month: 'Mar'},
  {school_month: 'Apr'},
  {school_month: 'May'},
  {school_month: 'Jun'},
  {school_month: 'Jul'},
  {school_month: 'Aug'},
  {school_month: 'Sep'},
  {school_month: 'Oct'},
  {school_month: 'Nov'},
  {school_month: 'Dec'}
])

days = Day.create([
  {school_day: '1'},
  {school_day: '2'},
  {school_day: '3'},
  {school_day: '4'},
  {school_day: '5'},
  {school_day: '6'},
  {school_day: '7'},
  {school_day: '8'},
  {school_day: '9'},
  {school_day: '10'},
  {school_day: '11'},
  {school_day: '12'},
  {school_day: '13'},
  {school_day: '14'},
  {school_day: '15'},
  {school_day: '16'},
  {school_day: '17'},
  {school_day: '18'},
  {school_day: '19'},
  {school_day: '20'},
  {school_day: '21'},
  {school_day: '22'},
  {school_day: '23'},
  {school_day: '24'},
  {school_day: '25'},
  {school_day: '26'},
  {school_day: '27'},
  {school_day: '28'},
  {school_day: '29'},
  {school_day: '30'},
  {school_day: '31'}
])

subjects = Subject.create([
  {school_subject: 'Math'},
  {school_subject: 'Biology'},
  {school_subject: 'Chemistry'},
  {school_subject: 'Physics'},
  {school_subject: 'Geography'},
  {school_subject: 'History'},
  {school_subject: 'Arabic'},
  {school_subject: 'English'},
  {school_subject: 'Somali'},
  {school_subject: 'Islamic Study'}
])

types = Type.create([
  {exam_type: "Final"},
  {exam_type: "Sub Final"},
  {exam_type: "Midterm"},
  {exam_type: "Sub Midterm"}
])


