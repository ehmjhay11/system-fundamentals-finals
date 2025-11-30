"use client"

import { useProducts } from "@/context/product-context"
import { Button } from "@/components/ui/button"

export default function CategoryFilter() {
  const { products, selectedCategory, setSelectedCategory } = useProducts()
  const categories = ["All", ...new Set(products.map((p) => p.category))]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
