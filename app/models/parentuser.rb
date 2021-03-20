class Parentuser < ApplicationRecord
  belongs_to :parent 

  validates :parent, presence: true

  validates :username, presence: true, length: { minimum: 3, maximum: 500 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }

  validates_uniqueness_of :username

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end  