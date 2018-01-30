class FixColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :roles, :type, :party
  end
end
