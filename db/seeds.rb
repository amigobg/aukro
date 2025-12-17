# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create sample categories
categories = [
  { name: "Electronics", description: "Electronic devices and accessories" },
  { name: "Fashion", description: "Clothing, shoes, and accessories" },
  { name: "Home & Garden", description: "Home decor, furniture, and garden items" },
  { name: "Sports", description: "Sports equipment and fitness gear" },
  { name: "Collectibles", description: "Collectible items and antiques" },
  { name: "Toys", description: "Toys and games for all ages" },
  { name: "Books", description: "Books, magazines, and comics" },
  { name: "Automotive", description: "Auto parts and accessories" }
]

categories.each do |cat|
  Category.find_or_create_by!(name: cat[:name]) do |category|
    category.description = cat[:description]
  end
end

puts "Ensured #{Category.count} categories"

# Create a demo user for owning the sample listings
demo_user = User.find_or_create_by!(email: "demo@aukro.test") do |user|
  user.password = "password123"
  user.password_confirmation = "password123"
  user.confirmed_at = Time.current
end

categories_by_name = Category.all.index_by(&:name)

listings_data = [
  {
    title: "Vintage Film Camera Kit",
    description: "Fully functional vintage 35mm camera with two lenses and original leather case.",
    selling_type: :auction,
    status: :active,
    condition: :used,
    quantity: 1,
    starting_price_cents: 7500,
    reserve_price_cents: 12000,
    auction_ends_at: 5.days.from_now,
    shipping_type: "standard",
    shipping_price_cents: 1500,
    currency: "USD",
    category: categories_by_name["Electronics"]
  },
  {
    title: "Smart Fitness Watch",
    description: "Latest generation smartwatch with heart-rate monitor and GPS tracking.",
    selling_type: :fixed_price,
    status: :active,
    condition: :new,
    quantity: 15,
    buy_now_price_cents: 19900,
    shipping_type: "express",
    shipping_price_cents: 999,
    currency: "USD",
    category: categories_by_name["Fashion"]
  },
  {
    title: "Carbon Mountain Bike",
    description: "Lightweight carbon frame trail bike, tuned and ready for racing.",
    selling_type: :auction,
    status: :ended,
    condition: :used,
    quantity: 1,
    starting_price_cents: 50000,
    reserve_price_cents: 65000,
    auction_ends_at: 2.days.ago,
    shipping_type: "freight",
    shipping_price_cents: 8000,
    currency: "USD",
    category: categories_by_name["Sports"]
  },
  {
    title: "Designer Leather Handbag",
    description: "Authentic limited edition tote in excellent condition with dust bag.",
    selling_type: :fixed_price,
    status: :sold,
    condition: :used,
    quantity: 1,
    buy_now_price_cents: 85000,
    shipping_type: "standard",
    shipping_price_cents: 2000,
    currency: "USD",
    category: categories_by_name["Fashion"]
  },
  {
    title: "Retro Game Console Bundle",
    description: "Includes original console, two controllers, and a starter game pack.",
    selling_type: :best_offer,
    status: :active,
    condition: :refurbished,
    quantity: 4,
    starting_price_cents: 18000,
    shipping_type: "standard",
    shipping_price_cents: 1200,
    currency: "USD",
    category: categories_by_name["Electronics"]
  },
  {
    title: "Garden Tools Starter Set",
    description: "14-piece stainless steel gardening set with carrying tote.",
    selling_type: :fixed_price,
    status: :active,
    condition: :new,
    quantity: 10,
    buy_now_price_cents: 6900,
    shipping_type: "standard",
    shipping_price_cents: 799,
    currency: "USD",
    category: categories_by_name["Home & Garden"]
  },
  {
    title: "Signed Baseball Memorabilia",
    description: "Autographed ball from a 1996 championship game with certificate of authenticity.",
    selling_type: :auction,
    status: :active,
    condition: :used,
    quantity: 1,
    starting_price_cents: 22000,
    reserve_price_cents: 30000,
    auction_ends_at: 7.days.from_now,
    shipping_type: "insured",
    shipping_price_cents: 2500,
    currency: "USD",
    category: categories_by_name["Collectibles"]
  },
  {
    title: "STEM Building Blocks Set",
    description: "Educational 500-piece building set suitable for ages 8 and up.",
    selling_type: :fixed_price,
    status: :draft,
    condition: :new,
    quantity: 25,
    buy_now_price_cents: 4900,
    shipping_type: "standard",
    shipping_price_cents: 599,
    currency: "USD",
    category: categories_by_name["Toys"]
  },
  {
    title: "Classic Jazz Vinyl Collection",
    description: "Set of 8 remastered jazz records from the 60s in pristine sleeves.",
    selling_type: :best_offer,
    status: :ended,
    condition: :used,
    quantity: 1,
    starting_price_cents: 32000,
    auction_ends_at: 1.day.ago,
    shipping_type: "standard",
    shipping_price_cents: 1500,
    currency: "USD",
    category: categories_by_name["Collectibles"]
  },
  {
    title: "Electric Guitar with Amp",
    description: "Beginner-friendly electric guitar bundle with practice amplifier and strap.",
    selling_type: :auction,
    status: :active,
    condition: :new,
    quantity: 3,
    starting_price_cents: 25000,
    reserve_price_cents: 40000,
    auction_ends_at: 3.days.from_now,
    shipping_type: "standard",
    shipping_price_cents: 3000,
    currency: "USD",
    category: categories_by_name["Electronics"]
  }
]

listings_data.each do |attrs|
  title = attrs[:title]
  category = attrs.delete(:category)
  listing = Listing.find_or_initialize_by(title:, user: demo_user)
  listing.assign_attributes(attrs)
  listing.category = category
  listing.save!
end

puts "Ensured #{Listing.count} total listings (#{listings_data.size} seeded for demo user)"
