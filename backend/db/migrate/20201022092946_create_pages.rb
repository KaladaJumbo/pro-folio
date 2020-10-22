class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.string :name
      t.string :html
      t.string :user_id
      
      t.timestamps
    end
  end
end
