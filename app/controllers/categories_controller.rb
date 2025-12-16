class CategoriesController < ApplicationController
  def index
    @categories = Category.root_categories
  end

  def show
    @category = Category.find(params[:id])
    @listings = @category.listings.active_listings.with_display_data.order(created_at: :desc)
  end
end
