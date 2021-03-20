class Month < ApplicationRecord
  has_many :paids
  has_many :attendances
  
  validates :school_month, presence: true, length: { maximum: 20 }

  validates_uniqueness_of :school_month

end  