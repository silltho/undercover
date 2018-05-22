class ChangeDefault < ActiveRecord::Migration[5.1]
  def change
    remove_column :games, :round
    add_column :games, :round, :integer, :default => 0
  end
end
