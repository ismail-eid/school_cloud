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

  after_validation :exam_unique

  def exam_unique
    @exam = Grade.where(student_id: self.student_id, year_id: self.year_id, type_id: self.type_id).first

    if @exam
      @exam.destroy
    end  
  end  

end  