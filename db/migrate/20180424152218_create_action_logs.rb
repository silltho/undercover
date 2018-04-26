class CreateActionLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :action_logs do |t|
      t.references :player, foreign_key: true
      t.references :game, foreign_key: true
      t.integer :round
      t.string :phase
      t.string :action

      t.timestamps
    end
  end
end
