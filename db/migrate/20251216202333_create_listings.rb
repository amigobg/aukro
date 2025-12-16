class CreateListings < ActiveRecord::Migration[8.0]
  def change
    create_table :listings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.string :category
      t.string :condition
      t.string :status
      t.string :selling_type
      t.integer :quantity
      t.integer :starting_price_cents
      t.integer :reserve_price_cents
      t.integer :buy_now_price_cents
      t.datetime :auction_ends_at
      t.string :shipping_type
      t.integer :shipping_price_cents
      t.string :currency

      t.timestamps
    end
  end
end
