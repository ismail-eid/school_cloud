class User < ApplicationRecord
  has_many :sessions
  has_many :schools

  validates :full_name, presence: true, length: { minimum: 3, maximum: 64 }
  validates :email, presence: true, length: { minimum: 3, maximum: 500 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }

  validates_uniqueness_of :email

  after_validation :hash_password

  private

  def hash_password
    self.password = BCrypt::Password.create(self.password)
  end
end
