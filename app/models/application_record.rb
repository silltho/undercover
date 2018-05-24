class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def assign_roles(amount_of_players)
    roles = Role.all.order(:power).reverse.take(amount_of_players).pluck(:id)
    unless amount_of_players == 9
      (amount_of_players - 9).times do
        roles << get_random_roles
      end
    end
    roles
  end

  def get_random_roles
    fill_roles = Role.all.order(:power).first(4).pluck(:id)
    case rand(101)
      when  1..37  then fill_roles.first
      when 38..75  then fill_roles.second
      when 76..88  then fill_roles.third
      when 89..100 then fill_roles.fourth
      else fill_roles.third
    end
  end
end
