class User < ApplicationRecord

    has_secure_password

    #validates :username, uniqueness: true, presence: true, length: {within: 3..24}
    #validates :password, presence: true, confirmation: true, length: {minimum: 8}
    #validates :avatar_url, presence: true
    #validates :bio, presence: true
end
