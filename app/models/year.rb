class Year < ApplicationRecord
  has_many :grades
  has_many :paids
  has_many :attendances

  validates :school_year, presence: true, length: { maximum: 20 }

  validates_uniqueness_of :school_year

end
