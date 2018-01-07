class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :name, :string
    add_column :users, :surname, :string
    add_column :users, :alias, :string
    add_column :users, :nationality, :string
  end
end
