class DashboardChannelTest < ActionCable::Channel::TestCase
  def test_subscribed
    # Simulate a subscription creation
    user = create(:user) #FactoryGirl

    allow(controller).to receive(:current_user).and_return(user)
    subscribe 'dashboard'

    # Asserts that the subscription was successfully created
    assert subscription.confirmed?

    # Asserts that the channel subscribes connection to a stream
    assert "dashboard", streams.last
  end

  def test_does_not
    subscribe

    # Asserts that the subscription was rejected
    assert subscription.rejected?
  end
end