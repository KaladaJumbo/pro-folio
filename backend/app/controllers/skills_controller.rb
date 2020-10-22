class SkillsController < ApplicationController

    def create 
        skill = Skill.new(name: params[:name], description: params[:description], html: params[:html], user_id: User.find_by(username: params[:username]).id) 
        if skill.save
            render json: skill
        end
    end

end
