class CategoriesController < ApplicationController
  def index
    @categories = Category.all.order(:name)
  end

  def show
    @category = Category.find(params[:id])
    @listings = @category.listings.active.includes(:user).order(created_at: :desc)
  end
end
