class CreateRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :relations do |t|
      t.references :player1, index: true, foreign_key: { to_table: :players }
      t.references :player2, index: true, foreign_key: { to_table: :players }
      t.references :role, foreign_key: true
      t.boolean :loyal
      t.timestamps
    end
  end
end
