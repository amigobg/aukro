class CreateBids < ActiveRecord::Migration[7.2]
  def change
    create_table :bids do |t|
      t.decimal :amount
      t.references :listing, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
