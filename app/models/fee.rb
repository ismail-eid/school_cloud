class Fee < ApplicationRecord
  belongs_to :school

  validates :amount, presence: true
  
  validates :school, presence: true
end  