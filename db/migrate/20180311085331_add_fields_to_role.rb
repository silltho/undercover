class AddFieldsToRole < ActiveRecord::Migration[5.1]
  def change
    add_column :roles, :goal, :text
    add_column :roles, :lore, :text
    add_column :roles, :punchline, :text
    add_column :roles, :active_text, :text
    add_column :roles, :passive_text, :text
  end
end
