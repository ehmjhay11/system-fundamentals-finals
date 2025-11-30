"use client"

import Image from "next/image"
import { ArrowLeft, ShoppingCart, AlertTriangle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/context/product-context"
import { useCart } from "@/context/cart-context"

interface ProductDetailProps {
  product: Product
  onBack: () => void
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addToCart, cart } = useCart()
  const isLowStock = product.quantity < 5
  const cartItem = cart.find((item) => item.product.id === product.id)

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-6" />
          {isLowStock && (
            <Badge variant="destructive" className="absolute left-4 top-4 gap-1 text-sm">
              <AlertTriangle className="h-4 w-4" />
              Low Stock - Only {product.quantity} left!
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2 bg-secondary text-secondary-foreground">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          </div>

          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>

          <Separator />

          <div>
            <h3 className="font-semibold text-foreground">Description</h3>
            <p className="mt-1 text-muted-foreground">{product.description}</p>
          </div>

          <Separator />

          <div className="rounded-lg border border-primary/20 bg-secondary/50 p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className={`text-lg font-semibold ${isLowStock ? "text-destructive" : "text-foreground"}`}>
                  {product.quantity} units
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => addToCart(product)}
            disabled={product.quantity === 0}
            variant={cartItem ? "secondary" : "default"}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItem
              ? `In Cart (${cartItem.quantity})`
              : product.quantity === 0
                ? "Out of Stock"
                : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
