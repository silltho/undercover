class DeletePhaseFromActionLogs < ActiveRecord::Migration[5.1]
  def change
    remove_column :action_logs, :phase
  end
end
