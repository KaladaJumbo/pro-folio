# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Project.destroy_all
Project.create(name: "profolio", description: "professional programming portfolio", user_id: 2)
Project.create(name: "filler", description: "fake stuff", user_id: 2)

Skill.destroy_all
Skill.create(name: "Ruby", description: "Programming language whatever", user_id: 2)
Skill.create(name: "js", description: "Programming language whatever", user_id: 2)
Skill.create(name: "rails", description: "Programming framework whatever", user_id: 2)
