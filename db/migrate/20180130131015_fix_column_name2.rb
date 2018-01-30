class FixColumnName2 < ActiveRecord::Migration[5.1]
  def change
    rename_column :roles, :attribute, :passive
    rename_column :roles, :skill, :active
  end
end
