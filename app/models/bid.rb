class Bid < ApplicationRecord
  belongs_to :listing
  belongs_to :user

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validate :amount_must_be_higher_than_current_price

  private

  def amount_must_be_higher_than_current_price
    return unless listing && amount

    current_highest = listing.bids.maximum(:amount) || listing.price
    if amount <= current_highest
      errors.add(:amount, "must be higher than the current price of #{current_highest}")
    end
  end
end
