import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import CategoryGrid from "../components/categories/CategoryGrid"

export default function CategoriesIndexPage({ categories = [], paths = {} }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-slate-500">Explore</p>
        <h1 className="text-3xl font-semibold text-slate-900">Browse categories</h1>
        <p className="text-slate-500">
          Discover curated collections and jump into the auctions that match your passion.
        </p>
      </div>

      {categories.length ? (
        <CategoryGrid categories={categories} />
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No categories found</CardTitle>
            <CardDescription>
              Start by creating a listing from your dashboard and it will appear inside a category here.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
