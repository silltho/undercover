class AddSessionToGamesUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :games_users, :session_id, :string
    remove_column :games_users, :user_id, :integer
  end
end
