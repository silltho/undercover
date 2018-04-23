class AddNotNillForSessionId < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :session_id, :string, null: false
  end
end
