class AddRelationsToGamesUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :games_users, :relations, :integer, array: true, default: []
  end
end
