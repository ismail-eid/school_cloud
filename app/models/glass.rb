class Glass < ApplicationRecord
  belongs_to :school 

  has_many :students

  validates :school, presence: true

  validates :class_name, presence: true, length: {maximum: 20}

end
