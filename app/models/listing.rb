class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :user
  has_many :bids, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true, inclusion: { in: %w[active sold closed] }
  validates :listing_type, presence: true, inclusion: { in: %w[auction classified] }

  scope :active, -> { where(status: "active") }
  scope :auctions, -> { where(listing_type: "auction") }
  scope :classifieds, -> { where(listing_type: "classified") }

  def current_price
    if listing_type == "auction" && bids.any?
      bids.maximum(:amount)
    else
      price
    end
  end
end
