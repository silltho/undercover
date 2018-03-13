class DeleteTitleFromGame < ActiveRecord::Migration[5.1]
  def change
    remove_column :games, :title
  end
end
