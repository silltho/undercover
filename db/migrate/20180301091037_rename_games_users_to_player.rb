class RenameGamesUsersToPlayer < ActiveRecord::Migration[5.1]
  def change
    rename_table :games_users, :players
  end
end
