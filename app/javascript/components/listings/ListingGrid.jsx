import React from "react"
import ListingCard from "./ListingCard"

export default function ListingGrid({ listings = [] }) {
  if (!listings.length) return null

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
