class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
      t.string :name
      t.string :type
      t.string :skill
      t.integer :power
      t.string :attribute
      t.string :rank

      t.timestamps
    end
  end
end
