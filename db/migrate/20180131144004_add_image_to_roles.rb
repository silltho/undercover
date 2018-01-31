class AddImageToRoles < ActiveRecord::Migration[5.1]
  def change
    add_column :roles, :image, :string
  end
end
