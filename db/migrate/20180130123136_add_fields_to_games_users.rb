class AddFieldsToGamesUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :games_users, :codename, :string
    add_reference :games_users, :role, index: true
  end
end


