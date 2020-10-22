require 'bcrypt'
class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users  
    end

    def show
        
    end

    def create
        user = User.new(first_name: params[:first_name], last_name: params[:last_name], username: params[:username], password: params[:password]) 
        if user.save
            render json: user
        end
    end

    def login

        user = User.find_by(username: params[:username])
        
        if user && user.authenticate(params[:password])

            render json: user
            
        end

    end
    
end

# else 
#     render :json => { :errors => user.errors.full_messages }, :status => 500