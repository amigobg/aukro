class HomeController < ApplicationController
  def index
    @featured_listings = Listing.active_listings.with_display_data.order(created_at: :desc).limit(12)
    @categories = Category.root_categories.limit(8)
  end
end
