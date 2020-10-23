require 'bcrypt'
class UsersController < ApplicationController

    def index
        users = User.all 
        render json: users.to_json({include: [:skills, :projects]})
    end

    def show
        user = User.find_by(username: params[:id])
        render json: user.to_json({include: [:skills, :projects]})
            
    end

    def create

        user = User.new(first_name: params[:first_name], last_name: params[:last_name], username: params[:username], password: params[:password])

        if user.save

            6.times do 

<<<<<<< HEAD
                skill = Skill.create(name: "edit me", description: "edit me", user_id: user.id)
                project = Project.create(name: "edit me", description: "edit me", user_id: user.id)
=======
                skill = Skill.create(name: "Edit name", description: "Edit content", user_id: user.id)
                project = Project.create(name: "Edit name", description: "Edit content", user_id: user.id)
>>>>>>> 975e99d8daa7662b9f24ce08730df19b6b4da76e

            end 

            render json: user.to_json({include: [:skills, :projects]})

        end

    end

    def login

        user = User.find_by(username: params[:username])
        
        if user && user.authenticate(params[:password])
        
            render json: user.to_json({include: [:skills, :projects]})
            
        end

    end

    def update
        # idk
    end
    
end

# else 
#     render :json => { :errors => user.errors.full_messages }, :status => 500