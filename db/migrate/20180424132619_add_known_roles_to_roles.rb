class AddKnownRolesToRoles < ActiveRecord::Migration[5.1]
  def change
    add_column :roles, :known_roles, :text
  end
end
