class Type < ApplicationRecord
  has_many :grades

  validates :exam_type, presence: true, length: { maximum: 64 }

  validates_uniqueness_of :exam_type

end  