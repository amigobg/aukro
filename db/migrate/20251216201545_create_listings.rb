class CreateListings < ActiveRecord::Migration[7.2]
  def change
    create_table :listings do |t|
      t.string :title
      t.text :description
      t.decimal :price
      t.references :category, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :status
      t.string :listing_type

      t.timestamps
    end
  end
end
