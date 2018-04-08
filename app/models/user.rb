class User < ActiveRecord::Base
    before_save { self.email = email.downcase } 

    has_many :journals

    has_secure_password

    validates :nickname, :email, :password, :password_confirmation, presence: true
    validates :email, uniqueness: { case_sensitive: false }
    validates :password, length: { minimum: 4 }
    
    #helper function for login authentication
    def self.authenticate_with_credentials email, password
      email.strip!
      email.downcase!
      if user = User.find_by(email: email).try(:authenticate, password)
        user
      else
        nil
      end
    end

end
