class CreateNewspapers < ActiveRecord::Migration[5.1]
  def change
    create_table :newspapers do |t|
      t.references :game, foreign_key: true
      t.integer :round
      t.timestamps
    end
  end
end
