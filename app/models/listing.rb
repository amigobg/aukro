class Listing < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  has_many_attached :images

  enum selling_type: {
    auction: "auction",
    fixed_price: "fixed_price",
    best_offer: "best_offer"
  }

  enum status: {
    draft: "draft",
    active: "active",
    sold: "sold",
    ended: "ended"
  }

  enum condition: {
    new: "new",
    used: "used",
    refurbished: "refurbished"
  }

  validates :title, :selling_type, :status, presence: true

  scope :active_listings, -> { where(status: "active") }
  scope :auctions, -> { where(selling_type: "auction") }
  scope :by_category, ->(category_id) { where(category_id: category_id) }

  def price
    return starting_price_cents if auction?
    return buy_now_price_cents if fixed_price?
    starting_price_cents
  end

  def formatted_price
    return "N/A" if price.nil?
    "$#{'%.2f' % (price / 100.0)}"
  end
end
