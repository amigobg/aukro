import React from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"

export default function CategoryCard({ category }) {
  if (!category) return null

  return (
    <a href={category.path} className="block">
      <Card className="h-full border-slate-200/70 bg-white/70 backdrop-blur transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
        <CardContent className="space-y-3 py-6">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-2xl">📦</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{category.description}</p>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
