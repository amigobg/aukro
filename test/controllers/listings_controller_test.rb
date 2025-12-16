require "test_helper"

class ListingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @listing = listings(:one)
  end

  test "should get index" do
    get listings_url
    assert_response :success
  end

  test "should get new" do
    get new_listing_url
    assert_response :success
  end

  test "should create listing" do
    assert_difference("Listing.count") do
      post listings_url, params: { listing: { auction_ends_at: @listing.auction_ends_at, buy_now_price_cents: @listing.buy_now_price_cents, category: @listing.category, condition: @listing.condition, currency: @listing.currency, description: @listing.description, quantity: @listing.quantity, reserve_price_cents: @listing.reserve_price_cents, selling_type: @listing.selling_type, shipping_price_cents: @listing.shipping_price_cents, shipping_type: @listing.shipping_type, starting_price_cents: @listing.starting_price_cents, status: @listing.status, title: @listing.title, user_id: @listing.user_id } }
    end

    assert_redirected_to listing_url(Listing.last)
  end

  test "should show listing" do
    get listing_url(@listing)
    assert_response :success
  end

  test "should get edit" do
    get edit_listing_url(@listing)
    assert_response :success
  end

  test "should update listing" do
    patch listing_url(@listing), params: { listing: { auction_ends_at: @listing.auction_ends_at, buy_now_price_cents: @listing.buy_now_price_cents, category: @listing.category, condition: @listing.condition, currency: @listing.currency, description: @listing.description, quantity: @listing.quantity, reserve_price_cents: @listing.reserve_price_cents, selling_type: @listing.selling_type, shipping_price_cents: @listing.shipping_price_cents, shipping_type: @listing.shipping_type, starting_price_cents: @listing.starting_price_cents, status: @listing.status, title: @listing.title, user_id: @listing.user_id } }
    assert_redirected_to listing_url(@listing)
  end

  test "should destroy listing" do
    assert_difference("Listing.count", -1) do
      delete listing_url(@listing)
    end

    assert_redirected_to listings_url
  end
end
