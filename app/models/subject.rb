class Subject < ApplicationRecord
  has_many :grades

  validates :school_subject, presence: true, length: { maximum: 64 }

  validates_uniqueness_of :school_subject

end  