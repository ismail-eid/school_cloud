class Parent < ApplicationRecord
  belongs_to :school
  has_many :students
  has_many :parentusers

  validates :full_name, presence: true, length: { minimum: 8, maximum: 64 }
  validates :phone, presence: true, length: {minimum: 10, maximum: 20}

  validates_uniqueness_of :phone

  validates :school, presence: true
end  