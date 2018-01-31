class AddStateToGamesUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :games_users, :state, :string
  end
end
