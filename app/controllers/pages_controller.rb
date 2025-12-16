class PagesController < ApplicationController
  def home
    @featured_listings = Listing.active.order(created_at: :desc).limit(6)
    @categories = Category.all
  end
end
