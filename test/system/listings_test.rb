require "application_system_test_case"

class ListingsTest < ApplicationSystemTestCase
  setup do
    @listing = listings(:one)
  end

  test "visiting the index" do
    visit listings_url
    assert_selector "h1", text: "Listings"
  end

  test "should create listing" do
    visit listings_url
    click_on "New listing"

    fill_in "Auction ends at", with: @listing.auction_ends_at
    fill_in "Buy now price cents", with: @listing.buy_now_price_cents
    fill_in "Category", with: @listing.category
    fill_in "Condition", with: @listing.condition
    fill_in "Currency", with: @listing.currency
    fill_in "Description", with: @listing.description
    fill_in "Quantity", with: @listing.quantity
    fill_in "Reserve price cents", with: @listing.reserve_price_cents
    fill_in "Selling type", with: @listing.selling_type
    fill_in "Shipping price cents", with: @listing.shipping_price_cents
    fill_in "Shipping type", with: @listing.shipping_type
    fill_in "Starting price cents", with: @listing.starting_price_cents
    fill_in "Status", with: @listing.status
    fill_in "Title", with: @listing.title
    fill_in "User", with: @listing.user_id
    click_on "Create Listing"

    assert_text "Listing was successfully created"
    click_on "Back"
  end

  test "should update Listing" do
    visit listing_url(@listing)
    click_on "Edit this listing", match: :first

    fill_in "Auction ends at", with: @listing.auction_ends_at.to_s
    fill_in "Buy now price cents", with: @listing.buy_now_price_cents
    fill_in "Category", with: @listing.category
    fill_in "Condition", with: @listing.condition
    fill_in "Currency", with: @listing.currency
    fill_in "Description", with: @listing.description
    fill_in "Quantity", with: @listing.quantity
    fill_in "Reserve price cents", with: @listing.reserve_price_cents
    fill_in "Selling type", with: @listing.selling_type
    fill_in "Shipping price cents", with: @listing.shipping_price_cents
    fill_in "Shipping type", with: @listing.shipping_type
    fill_in "Starting price cents", with: @listing.starting_price_cents
    fill_in "Status", with: @listing.status
    fill_in "Title", with: @listing.title
    fill_in "User", with: @listing.user_id
    click_on "Update Listing"

    assert_text "Listing was successfully updated"
    click_on "Back"
  end

  test "should destroy Listing" do
    visit listing_url(@listing)
    accept_confirm { click_on "Destroy this listing", match: :first }

    assert_text "Listing was successfully destroyed"
  end
end
