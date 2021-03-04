class School < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: {minimum: 3, maximum: 64}
  validates :tell, presence: true, length: {maximum: 20}
  validates :address, presence: true, length: {maximum: 64}

  validates_uniqueness_of :name
  validates_uniqueness_of :tell
  
  validates :user, presence: true
end  