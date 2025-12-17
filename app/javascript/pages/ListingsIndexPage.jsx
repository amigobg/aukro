import React from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import ListingGrid from "../components/listings/ListingGrid"

export default function ListingsIndexPage({ listings = [], meta = {}, actions = {} }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">Marketplace</p>
          <h1 className="text-3xl font-semibold text-slate-900">All listings</h1>
          <p className="text-slate-500">{meta.total || listings.length} items available right now.</p>
        </div>
        {actions.can_create ? (
          <Button asChild size="lg">
            <a href={actions.new_listing_path}>Create listing</a>
          </Button>
        ) : (
          <Button asChild size="lg">
            <a href={actions.sign_in_path}>Sign in to sell</a>
          </Button>
        )}
      </div>

      {listings.length ? (
        <ListingGrid listings={listings} />
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No listings yet</CardTitle>
            <CardDescription>
              {actions.can_create
                ? "List your first item to kick off the marketplace."
                : "Sign in to be the first seller today."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href={actions.can_create ? actions.new_listing_path : actions.sign_in_path}>
                {actions.can_create ? "Create listing" : "Sign in"}
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
