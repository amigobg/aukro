import React from "react"
import { ArrowLeft, Layers } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import ListingGrid from "../components/listings/ListingGrid"

export default function CategoryShowPage({ category, listings = [], meta = {}, paths = {} }) {
  if (!category) return null

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm" className="w-fit gap-2 text-slate-500 hover:text-slate-900">
            <a href={paths.categories}>
              <ArrowLeft className="h-4 w-4" />
              Back to categories
            </a>
          </Button>
          <div className="flex items-center gap-3 text-slate-500">
            <Layers className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium uppercase tracking-wide">Category</p>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">{category.name}</h1>
          <p className="text-slate-500">{category.description}</p>
        </div>
        <Card className="w-full max-w-xs border-blue-100 bg-blue-50/60 text-blue-900">
          <CardHeader>
            <CardTitle className="text-base">Listings inside</CardTitle>
            <CardDescription className="text-sm text-blue-700">{meta.total_listings || 0} active</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {listings.length ? (
        <ListingGrid listings={listings} />
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No listings yet</CardTitle>
            <CardDescription>
              This category does not include any items yet. Be the first to create one from your seller dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href={paths.categories}>Discover other categories</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
