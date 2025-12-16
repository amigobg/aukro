class ListingsController < ApplicationController
  before_action :require_login, except: [ :index, :show ]
  before_action :set_listing, only: [ :show, :edit, :update, :destroy ]
  before_action :require_owner, only: [ :edit, :update, :destroy ]

  def index
    @listings = Listing.active.includes(:category, :user).order(created_at: :desc)
    @listings = @listings.where(category_id: params[:category_id]) if params[:category_id]
    @listings = @listings.where(listing_type: params[:type]) if params[:type]
  end

  def show
    @bids = @listing.bids.includes(:user).order(created_at: :desc)
  end

  def new
    @listing = Listing.new
  end

  def create
    @listing = current_user.listings.build(listing_params)
    @listing.status = "active"

    if @listing.save
      flash[:notice] = "Listing created successfully!"
      redirect_to @listing
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @listing.update(listing_params)
      flash[:notice] = "Listing updated successfully!"
      redirect_to @listing
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @listing.destroy
    flash[:notice] = "Listing deleted successfully!"
    redirect_to listings_path
  end

  private

  def set_listing
    @listing = Listing.find(params[:id])
  end

  def require_owner
    unless @listing.user == current_user
      flash[:alert] = "You are not authorized to perform this action"
      redirect_to listings_path
    end
  end

  def listing_params
    params.require(:listing).permit(:title, :description, :price, :category_id, :listing_type)
  end
end
