class AddPartyFlagToPlayer < ActiveRecord::Migration[5.1]
  def change
    add_column :players, :changed_party, :boolean, default: false
  end
end
