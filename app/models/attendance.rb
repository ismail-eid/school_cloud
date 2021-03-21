class Attendance < ApplicationRecord
  belongs_to :student
  belongs_to :year
  belongs_to :month
  belongs_to :day

  validates :student, presence: true
  validates :year, presence: true
  validates :month, presence: true
  validates :day, presence: true

  after_validation :attendance_unique

  def attendance_unique
    @attendance = Attendance.where(student_id: self.student_id, year_id: self.year_id, month_id: self.month_id, day_id: self.day_id).first

    if @attendance
      raise ArgumentError.new("attendance must be unique")
    end  
  end  

end  