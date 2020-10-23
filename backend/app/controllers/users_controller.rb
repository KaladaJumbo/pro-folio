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
        user.image = "https://www.likemind.media/wp-content/uploads/2017/06/Profile-Photo.png"

        user.html = "<div class='card' style='width: 300px;'>
        <div class='name'>
            #{user.first_name} #{user.last_name}
        </div>
        <img src=#{user.image}>
        <div class='card-section'>
            <h4 class='status-name skill-name'>Status header</h4>
            <p  class='status-description skill-description'>Status description</p>
        </div>
        <span class= 'buttonIcon' id='b3'><i class='far fa-edit profile-edit'></i></span>
    </div>"

        if user.save

            6.times do 

                skill = Skill.create(name: "Edit name", description: "Edit content", user_id: user.id)
                project = Project.create(name: "Edit name", description: "Edit content", user_id: user.id)

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
        #just for images
        user = User.find_by(username: params[:id])

        user.update(image: params[:image], html: params[:html])

        if user.save

            render json: user
            
        end
    end
    
end
