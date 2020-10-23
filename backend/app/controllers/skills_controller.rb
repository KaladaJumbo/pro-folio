class SkillsController < ApplicationController

    def create 
        skill = Skill.new(name: params[:name], description: params[:description], html: params[:html], user_id: User.find_by(username: params[:username]).id) 
        if skill.save
            render json: skill
        end
    end

    def update
        skill = Skill.find(params[:id])
        skill.update(name: params[:name], description: params[:description])

        if skill.save

            render json: skill
            
        end

    end

end
