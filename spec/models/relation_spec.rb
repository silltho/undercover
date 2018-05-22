require 'rails_helper'

RSpec.describe Relation, type: :model do
  let!(:relation) { Relation.new }

  it 'is not valid since the players are missing' do
    expect(relation).not_to be_valid
  end

end
