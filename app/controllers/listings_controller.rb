class ListingsController < ApplicationController
  include ActionView::Helpers::NumberHelper
  before_action :authenticate_user!, except: %i[ index show ]
  before_action :set_listing, only: %i[ show edit update destroy bid ]

  # GET /listings or /listings.json
  def index
    @listings = Listing.with_display_data.order(created_at: :desc)
  end

  # GET /listings/1 or /listings/1.json
  def show
  end

  # GET /listings/new
  def new
    @listing = current_user.listings.build
  end

  # GET /listings/1/edit
  def edit
  end

  # POST /listings or /listings.json
  def create
    @listing = current_user.listings.build(listing_params)

    respond_to do |format|
      if @listing.save
        format.html { redirect_to @listing, notice: "Listing was successfully created." }
        format.json { render :show, status: :created, location: @listing }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /listings/1 or /listings/1.json
  def update
    respond_to do |format|
      if @listing.update(listing_params)
        format.html { redirect_to @listing, notice: "Listing was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @listing }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @listing.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /listings/1 or /listings/1.json
  def destroy
    @listing.destroy!

    respond_to do |format|
      format.html { redirect_to listings_path, notice: "Listing was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  def bid
    unless @listing.auction?
      redirect_to @listing, alert: "Bidding is only available for auction listings."
      return
    end

    if current_user.id == @listing.user_id
      redirect_to @listing, alert: "You cannot bid on your own listing."
      return
    end

    amount = bid_params[:amount].to_f
    amount_cents = (amount * 100).to_i
    current_bid_cents = @listing.starting_price_cents.to_i
    minimum_bid_cents = current_bid_cents + 100

    if amount_cents < minimum_bid_cents
      redirect_to @listing, alert: "Bid must be at least #{number_to_currency(minimum_bid_cents / 100.0)}."
      return
    end

    if @listing.update(starting_price_cents: amount_cents)
      redirect_to @listing, notice: "Your bid was placed successfully!"
    else
      redirect_to @listing, alert: "Unable to place bid. Please try again."
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing
      @listing = Listing.with_display_data.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def listing_params
      params.expect(listing: [ :title, :description, :category_id, :condition, :status, :selling_type, :quantity, :starting_price_cents, :reserve_price_cents, :buy_now_price_cents, :auction_ends_at, :shipping_type, :shipping_price_cents, :currency, images: [] ])
    end

    def bid_params
      params.expect(bid: [ :amount ])
    rescue ActionController::ParameterMissing
      { amount: nil }
    end
end
