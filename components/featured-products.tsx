"use client"

import Image from "next/image"
import { useProducts } from "@/context/product-context"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Sparkles } from "lucide-react"

interface FeaturedProductsProps {
  onSelectProduct: (id: string) => void
}

export default function FeaturedProducts({ onSelectProduct }: FeaturedProductsProps) {
  const { products } = useProducts()
  const { addToCart } = useCart()

  const featuredProducts = products.filter((p) => p.featured)
  if (featuredProducts.length === 0) return null

  const mainFeatured = featuredProducts[0]
  const others = featuredProducts.slice(1, 3)

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 lg:row-span-2">
          <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">
            <Sparkles className="mr-1 h-3 w-3" />
            Featured
          </Badge>

          <div className="flex h-full flex-col justify-between">
            <div className="mb-4">
              <div className="relative mx-auto mb-6 aspect-[4/3] w-full max-w-[320px] overflow-hidden rounded-xl bg-white/10">
                <Image
                  src={mainFeatured.image || "/placeholder.svg"}
                  alt={mainFeatured.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <Badge variant="secondary" className="mb-2 bg-white/20 text-white">
                {mainFeatured.category}
              </Badge>
              <h3 className="mb-2 text-2xl font-bold text-primary-foreground">{mainFeatured.name}</h3>
              <p className="mb-4 line-clamp-2 text-primary-foreground/80">{mainFeatured.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-primary-foreground">${mainFeatured.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => onSelectProduct(mainFeatured.id)}
                >
                  Details
                </Button>
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => addToCart(mainFeatured)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        {others.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              Featured
            </Badge>

            <div className="flex gap-4">
              <div className="relative aspect-square w-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <Badge variant="secondary" className="mb-1 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="mb-1 font-semibold text-foreground line-clamp-1">{product.name}</h3>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onSelectProduct(product.id)}>
                      Details
                    </Button>
                    <Button size="sm" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
