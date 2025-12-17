import React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { cn, formatDate } from "../lib/utils"

export default function ListingShowPage({ listing, authenticity_token, paths = {} }) {
  if (!listing) return null

  const primaryImage = listing.images?.[0]
  const secondaryImages = listing.images?.slice(1, 5) || []
  const isAuction = listing.selling_type === "auction"
  const ctaLabel = isAuction ? "Place bid" : "Buy it now"

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900">
        <a href={paths.back || "/listings"}>
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </a>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            {primaryImage ? (
              <img src={primaryImage} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex aspect-square items-center justify-center bg-slate-100 text-6xl text-slate-300">
                📷
              </div>
            )}
          </Card>
          {secondaryImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {secondaryImages.map((image, index) => (
                <Card key={`${image}-${index}`} className="overflow-hidden">
                  <img src={image} alt={`${listing.title} ${index + 2}`} className="h-full w-full object-cover" />
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Badge variant={listing.badge_variant || "default"} className="w-fit">
              {listing.selling_label}
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-900">{listing.title}</h1>
            <p className="text-slate-500">{listing.description || "No description provided."}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-slate-900">{listing.price}</CardTitle>
              <CardDescription>
                {isAuction ? "Current bid" : "Buy-now price"} · {listing.status || listing.selling_type_label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {listing.auction_ends_at && (
                <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Auction ends <span className="font-semibold text-slate-900">{formatDate(listing.auction_ends_at, { time: true })}</span>
                </div>
              )}
              <Button size="lg" className="w-full">
                {ctaLabel}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
              <CardDescription>Key facts about this listing.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                {listing.condition && (
                  <>
                    <dt className="text-slate-500">Condition</dt>
                    <dd className="font-medium text-slate-900">{listing.condition}</dd>
                  </>
                )}
                {listing.category?.name && (
                  <>
                    <dt className="text-slate-500">Category</dt>
                    <dd>
                      <a href={listing.category.path} className="font-medium text-blue-600 hover:underline">
                        {listing.category.name}
                      </a>
                    </dd>
                  </>
                )}
                {listing.quantity && (
                  <>
                    <dt className="text-slate-500">Quantity</dt>
                    <dd className="font-medium text-slate-900">{listing.quantity}</dd>
                  </>
                )}
                <dt className="text-slate-500">Selling type</dt>
                <dd className="font-medium text-slate-900">{listing.selling_type_label}</dd>
              </dl>
            </CardContent>
          </Card>

          {listing.owner_controls?.can_manage && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manage listing</CardTitle>
                <CardDescription>Quick actions for your item.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="secondary" className="flex-1">
                  <a href={listing.owner_controls.edit_path}>Edit</a>
                </Button>
                <form action={listing.owner_controls.delete_path} method="post" className="flex-1">
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="authenticity_token" value={authenticity_token} />
                  <Button type="submit" variant="destructive" className="w-full">
                    Delete
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
