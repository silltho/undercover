class AddPlayersToNewspaper < ActiveRecord::Migration[5.1]
  def change
    add_reference :newspapers, :committer, index: true
    add_foreign_key :newspapers, :players, column: :committer_id
    add_reference :newspapers, :victim, index: true
    add_foreign_key :newspapers, :players, column: :victim_id
    add_column :newspapers, :success, :boolean
  end
end
