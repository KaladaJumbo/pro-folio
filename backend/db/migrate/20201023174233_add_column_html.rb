class AddColumnHtml < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :html, :string
  end
end
