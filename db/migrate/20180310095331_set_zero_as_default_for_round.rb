class SetZeroAsDefaultForRound < ActiveRecord::Migration[5.1]
  def change
    change_column :games, :round, :integer, default: 0
  end
end
