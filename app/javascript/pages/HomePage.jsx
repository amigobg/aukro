import React from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import ListingGrid from "../components/listings/ListingGrid"
import CategoryGrid from "../components/categories/CategoryGrid"

export default function HomePage({ categories = [], featured_listings = [], paths = {} }) {
  return (
    <div className="space-y-12">
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 text-white">
        <CardContent className="grid gap-10 px-8 py-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
              <Sparkles className="h-4 w-4" />
              Marketplace reimagined
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Discover, bid, and sell unique finds on Aukro.
            </h1>
            <p className="text-lg text-blue-100/90">
              A curated marketplace for collectors, sellers, and treasure hunters. Powered by modern Shadcn UI and React.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={paths.new_listing}>Start selling</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="bg-white/20 text-white hover:bg-white/30">
                <a href={paths.listings}>
                  Explore listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm leading-relaxed text-blue-50 shadow-xl backdrop-blur">
            <p>
              <span className="font-semibold">Tip:</span> Listings that include multiple high-resolution photos sell 27% faster.
              Use our new media uploader to showcase every detail.
            </p>
            <div className="mt-6 grid gap-3 text-xs uppercase tracking-wide text-blue-200">
              <div className="flex justify-between">
                <span>Active sellers</span>
                <span>2.4k</span>
              </div>
              <div className="flex justify-between">
                <span>Auctions this week</span>
                <span>580+</span>
              </div>
              <div className="flex justify-between">
                <span>Buy-now items</span>
                <span>1.9k</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Shop by category</h2>
            <p className="text-sm text-slate-500">Browse collections curated by our community.</p>
          </div>
          <Button asChild variant="ghost">
            <a href={paths.all_categories} className="gap-2">
              View all
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        {categories.length ? (
          <CategoryGrid categories={categories} />
        ) : (
          <Card className="border-dashed border-slate-200 bg-white/70">
            <CardHeader>
              <CardTitle>No categories yet</CardTitle>
              <CardDescription>Start by creating a listing and choose a category to feature it here.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured listings</h2>
            <p className="text-sm text-slate-500">Handpicked items from trusted sellers.</p>
          </div>
          <Button asChild variant="ghost">
            <a href={paths.listings} className="gap-2">
              View marketplace
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        {featured_listings.length ? (
          <ListingGrid listings={featured_listings} />
        ) : (
          <Card className="border-dashed border-slate-200 bg-white/70">
            <CardHeader>
              <CardTitle>No listings yet</CardTitle>
              <CardDescription>
                Be the first to list an item and it will appear in this featured section automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href={paths.new_listing}>Create listing</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
