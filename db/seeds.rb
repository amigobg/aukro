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

puts "Created #{Category.count} categories"
