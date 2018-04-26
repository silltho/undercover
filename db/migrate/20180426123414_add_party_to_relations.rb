class AddPartyToRelations < ActiveRecord::Migration[5.1]
  def change
    add_column :relations, :party, :string
  end
end
