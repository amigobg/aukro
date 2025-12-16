json.extract! listing, :id, :user_id, :title, :description, :category, :condition, :status, :selling_type, :quantity, :starting_price_cents, :reserve_price_cents, :buy_now_price_cents, :auction_ends_at, :shipping_type, :shipping_price_cents, :currency, :created_at, :updated_at
json.url listing_url(listing, format: :json)
