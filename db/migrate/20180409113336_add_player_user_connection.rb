class AddPlayerUserConnection < ActiveRecord::Migration[5.1]
  def change
    remove_column :players, :session_id
    add_reference :players, :user, index: true
  end
end
