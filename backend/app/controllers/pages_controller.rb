class PagesController < ApplicationController
    
    def create
        page = Page.new(name: params[:name], html: params[:html], user_id: User.find_by(username: params[:username]).id) 
        if page.save
            render json: page
        end
    end

end
