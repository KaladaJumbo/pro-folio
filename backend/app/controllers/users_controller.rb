require 'bcrypt'
class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users  
    end

    def show
        user = User.find_by(username: params[:id])

        render json: user
    end

    def create
        user = User.new(first_name: params[:first_name], last_name: params[:last_name], username: params[:username], password: params[:password]) 
        if user.save
            render json: user
        else 
            render json: {status: "error", code: 3000, message: user.errors.full_message}
        end
    end

    def login
        #local session js and send login for authentication... something something ... 
    end
end
