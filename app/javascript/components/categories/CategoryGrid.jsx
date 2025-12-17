import React from "react"
import CategoryCard from "./CategoryCard"

export default function CategoryGrid({ categories = [] }) {
  if (!categories.length) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
