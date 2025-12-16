class Listing < ApplicationRecord
  belongs_to :user
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
end
