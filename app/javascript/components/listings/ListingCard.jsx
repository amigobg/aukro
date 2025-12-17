import React from "react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { cn, formatDate } from "../../lib/utils"

export default function ListingCard({ listing }) {
  if (!listing) return null

  return (
    <a href={listing.path} className="block">
      <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
          {listing.image_url ? (
            <img src={listing.image_url} alt={listing.title} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl text-slate-300">📦</div>
          )}
          {listing.selling_label && (
            <Badge variant={listing.badge_variant || "default"} className="absolute right-3 top-3">
              {listing.selling_label}
            </Badge>
          )}
        </div>
        <CardContent className="space-y-3 pb-5 pt-4">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              {listing.category?.name || listing.condition || "Featured"}
            </div>
            <h3 className="text-base font-semibold leading-tight text-slate-900 line-clamp-2">{listing.title}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-900">{listing.price}</span>
            {listing.auction_ends_at && (
              <span className="text-xs text-slate-500">Ends {formatDate(listing.auction_ends_at)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
