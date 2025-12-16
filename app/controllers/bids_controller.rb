class BidsController < ApplicationController
  before_action :require_login

  def create
    @listing = Listing.find(params[:listing_id])
    @bid = @listing.bids.build(bid_params)
    @bid.user = current_user

    if @listing.listing_type != "auction"
      flash[:alert] = "You can only bid on auctions"
      redirect_to @listing
    elsif @bid.save
      flash[:notice] = "Bid placed successfully!"
      redirect_to @listing
    else
      flash[:alert] = @bid.errors.full_messages.join(", ")
      redirect_to @listing
    end
  end

  private

  def bid_params
    params.require(:bid).permit(:amount)
  end
end
