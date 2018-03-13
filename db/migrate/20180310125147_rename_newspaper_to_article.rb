class RenameNewspaperToArticle < ActiveRecord::Migration[5.1]
  def change
    rename_table :newspapers, :articles
  end
end
