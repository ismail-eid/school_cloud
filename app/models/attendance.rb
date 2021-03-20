class Attendance < ApplicationRecord
  belongs_to :student
  belongs_to :year
  belongs_to :month
  belongs_to :day

  validates :student, presence: true
  validates :year, presence: true
  validates :month, presence: true
  validates :day, presence: true

end  