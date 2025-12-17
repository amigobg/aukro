import React from "react"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { formatDate } from "../lib/utils"

function BidPanel({ bid }) {
  if (!bid) return null
  const minValue = Number.parseFloat(bid.min_amount || 0).toFixed(2)

  if (bid.requires_login) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Sign in to place a bid</p>
        <a href={bid.sign_in_path} className="mt-2 inline-flex text-blue-600 hover:underline">
          Go to sign in
        </a>
      </div>
    )
  }

  if (bid.is_owner) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <div className="flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4" />
          You&apos;re the owner of this listing
        </div>
        <p className="mt-2 text-amber-700">Use the manage section below to edit or end the listing.</p>
      </div>
    )
  }

  if (!bid.can_bid) return null

  return (
    <form action={bid.action} method="post" className="space-y-3">
      <input type="hidden" name="authenticity_token" value={bid.authenticity_token} />
      <div className="text-sm text-slate-600">
        Current bid <span className="font-semibold text-slate-900">{bid.current_bid}</span>
      </div>
      <label className="text-sm font-medium text-slate-700">
        Your bid (USD)
        <input
          type="number"
          name="bid[amount]"
          step="0.01"
          min={bid.min_amount}
          defaultValue={minValue}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        />
      </label>
      <p className="text-xs text-slate-500">Minimum bid: {bid.minimum_bid_display}</p>
      <Button type="submit" className="w-full" size="lg">
        Place bid
      </Button>
    </form>
  )
}

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
              {isAuction ? (
                <BidPanel bid={listing.bid} />
              ) : (
                <Button size="lg" className="w-full">
                  {ctaLabel}
                </Button>
              )}
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
