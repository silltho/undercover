class AddGameToMessages < ActiveRecord::Migration[5.1]
  def change
  	 add_reference :messages, :game, index: true
  end
end
