class Grade < ApplicationRecord
  belongs_to :type
  belongs_to :subject
  belongs_to :student
  belongs_to :year

  validates :type, presence: true
  validates :subject, presence: true
  validates :student, presence: true
  validates :year, presence: true
  
  validates :student_grade, presence: true, length: { maximum: 3 }
end  