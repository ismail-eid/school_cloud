class Paid < ApplicationRecord
  belongs_to :student
  belongs_to :year
  belongs_to :month

  validates :student, presence: true
  validates :year, presence: true
  validates :month, presence: true

end  