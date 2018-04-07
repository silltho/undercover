class AddNewspaperTextsToRoles < ActiveRecord::Migration[5.1]
  def change
    add_column :roles, :text_success, :text
    add_column :roles, :text_fail, :text
  end
end
