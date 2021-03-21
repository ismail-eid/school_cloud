class Student < ApplicationRecord
  belongs_to :glass 
  belongs_to :parent 

  has_many :grades
  has_many :paids
  has_many :attendances

  has_one_attached :photo

  validates :full_name, presence: true, length: {minimum: 8, maximum: 64}
  validates :phone, presence: true, length: { maximum: 20 }
  validates :gender, presence: true, length: { maximum: 20 }
  validates :address, presence: true, length: { maximum: 20 } 
  validates :birthday, presence: true, length: { maximum: 20 }
  validates :student_id, presence: true, length: { maximum: 20 }

  validates_uniqueness_of :phone

  validates :glass, presence: true
  validates :parent, presence: true

  after_validation :class_unique

  def class_unique
    full_name = Glass.find(glass_id).students.find_by(full_name: self.full_name)
    student_id = Glass.find(glass_id).students.find_by(student_id: self.student_id)

    if (full_name || student_id) && self.id == nil
      raise ArgumentError.new("Name and Student Id must be unique")
    end    
  end  
end  