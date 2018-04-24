class DeleteRelationsFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :players, :relations
  end
end
