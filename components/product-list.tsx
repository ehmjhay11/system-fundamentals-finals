"use client"

import { useProducts } from "@/context/product-context"
import ProductCard from "./product-card"
import CategoryFilter from "./category-filter"
import FeaturedProducts from "./featured-products"

interface ProductListProps {
  onSelectProduct: (id: string) => void
}

export default function ProductList({ onSelectProduct }: ProductListProps) {
  const { products, selectedCategory } = useProducts()

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="space-y-6">
      {selectedCategory === "All" && <FeaturedProducts onSelectProduct={onSelectProduct} />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Products</h2>
          <p className="text-muted-foreground">{filteredProducts.length} products available</p>
        </div>
        <CategoryFilter />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={() => onSelectProduct(product.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
