# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Project.destroy_all
Skill.destroy_all


new_user = User.create(first_name: "bob", last_name: "bobbin", username: "bob", password: "bob")

Project.create(name: "profolio", description: "professional programming portfolio", user_id: new_user.id)
Project.create(name: "filler", description: "fake stuff", user_id: new_user.id)
Project.create(user_id: new_user.id)
Project.create(user_id: new_user.id)
Project.create(user_id: new_user.id)
Project.create(user_id: new_user.id)



Skill.create(name: "Ruby", description: "Programming language whatever", user_id: new_user.id)
Skill.create(name: "js", description: "Programming language whatever", user_id: new_user.id)
Skill.create(name: "rails", description: "Programming framework whatever", user_id: new_user.id)
Skill.create(user_id: new_user.id)
Skill.create(user_id: new_user.id)
Skill.create(user_id: new_user.id)


