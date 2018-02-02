class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def assign_roles(amount_of_players)
    Role.all.order(:power).reverse.take(amount_of_players).pluck(:id)
  end
end
