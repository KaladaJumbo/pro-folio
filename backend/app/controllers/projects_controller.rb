class ProjectsController < ApplicationController


    def create 
        project = Project.new(name: params[:name], description: params[:description], html: params[:html], user_id: User.find_by(username: params[:username]).id) 
        if project.save
            render json: project
        end
    end

    def update
        project = Project.find(params[:id])
        project.update(name: params[:name], description: params[:description])

        if project.save

            render json: project
            
        end

    end
    
end
