#require 'bcrypt'

class User < ApplicationRecord
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true 
    validates :username, presence: true, uniqueness: true
    
    def name 
        return self.first_name + " " + self.last_name
    end
end

