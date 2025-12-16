class AddCategoryIdToListings < ActiveRecord::Migration[8.0]
  def change
    add_reference :listings, :category, foreign_key: true, index: true
  end
end
