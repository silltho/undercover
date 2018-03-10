require 'rails_helper'
require 'aasm/rspec'

RSpec.describe Role, type: :model do
  let!(:role) { Role.new }

  it 'is valid with valid attributes' do
    expect(role).to be_valid
  end
end
