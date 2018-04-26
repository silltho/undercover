class DeleteLoyalFromRelations < ActiveRecord::Migration[5.1]
  def change
    remove_column :relations, :loyal
  end
end
