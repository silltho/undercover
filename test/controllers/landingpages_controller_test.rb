require 'test_helper'

class LandingpagesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get landingpages_show_url
    assert_response :success
  end

end
