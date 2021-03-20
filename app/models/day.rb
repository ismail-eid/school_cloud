class Day < ApplicationRecord
  has_many :attendances

  validates :school_day, presence: true, length: { maximum: 20 }

  validates_uniqueness_of :school_day

end  