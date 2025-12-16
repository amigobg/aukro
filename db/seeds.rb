# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create categories
categories = [
  { name: "Electronics", description: "Computers, phones, and electronic devices" },
  { name: "Vehicles", description: "Cars, motorcycles, and other vehicles" },
  { name: "Real Estate", description: "Houses, apartments, and land" },
  { name: "Fashion", description: "Clothing, shoes, and accessories" },
  { name: "Home & Garden", description: "Furniture, decor, and gardening items" },
  { name: "Sports & Hobbies", description: "Sports equipment and hobby items" }
]

categories.each do |category_data|
  Category.find_or_create_by!(name: category_data[:name]) do |category|
    category.description = category_data[:description]
  end
end

# Create sample users
user1 = User.find_or_create_by!(email: "john@example.com") do |user|
  user.name = "John Doe"
  user.password = "password123"
  user.password_confirmation = "password123"
end

user2 = User.find_or_create_by!(email: "jane@example.com") do |user|
  user.name = "Jane Smith"
  user.password = "password123"
  user.password_confirmation = "password123"
end

# Create sample listings
electronics = Category.find_by(name: "Electronics")
vehicles = Category.find_by(name: "Vehicles")
real_estate = Category.find_by(name: "Real Estate")

Listing.find_or_create_by!(title: "iPhone 13 Pro") do |listing|
  listing.description = "Like new iPhone 13 Pro, 256GB, Space Gray. Includes original box and accessories."
  listing.price = 799.99
  listing.category = electronics
  listing.user = user1
  listing.status = "active"
  listing.listing_type = "classified"
end

Listing.find_or_create_by!(title: "2020 Honda Civic") do |listing|
  listing.description = "Well-maintained Honda Civic with low mileage. Full service history available."
  listing.price = 18000.00
  listing.category = vehicles
  listing.user = user2
  listing.status = "active"
  listing.listing_type = "classified"
end

Listing.find_or_create_by!(title: "Vintage Camera Collection") do |listing|
  listing.description = "Rare vintage camera collection, perfect for collectors. Starting bid is low!"
  listing.price = 500.00
  listing.category = electronics
  listing.user = user1
  listing.status = "active"
  listing.listing_type = "auction"
end

Listing.find_or_create_by!(title: "Mountain Bike") do |listing|
  listing.description = "Professional mountain bike, barely used. Great condition!"
  listing.price = 1200.00
  listing.category = Category.find_by(name: "Sports & Hobbies")
  listing.user = user2
  listing.status = "active"
  listing.listing_type = "auction"
end

puts "Seed data created successfully!"
puts "Categories: #{Category.count}"
puts "Users: #{User.count}"
puts "Listings: #{Listing.count}"
