require 'bcrypt'
class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users  
    end

    def show
        user = User.find_by(username: params[:id])
        render json: user.to_json({include: [:skills, :projects]})
            
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
        
            render json: user.to_json({include: [:skills, :projects]})
            
        end

    end

    def update
        #handle project and skill update
    end
    
end

# else 
#     render :json => { :errors => user.errors.full_messages }, :status => 500