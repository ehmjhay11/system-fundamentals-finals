"use client"

import Image from "next/image"
import { ShoppingCart, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/context/product-context"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  product: Product
  onViewDetails: () => void
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart, cart } = useCart()
  const isLowStock = product.quantity < 5
  const cartItem = cart.find((item) => item.product.id === product.id)

  return (
    <Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
        />
        {isLowStock && (
          <Badge variant="destructive" className="absolute left-2 top-2 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Low Stock
          </Badge>
        )}
        <Badge className="absolute right-2 top-2 bg-secondary text-secondary-foreground">{product.category}</Badge>
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <p className={`text-sm ${isLowStock ? "font-medium text-destructive" : "text-muted-foreground"}`}>
            Qty: {product.quantity}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t p-4">
        <Button variant="outline" className="w-full bg-transparent" onClick={onViewDetails}>
          View Details
        </Button>

        <Button
          className="w-full gap-2"
          onClick={() => addToCart(product)}
          disabled={product.quantity === 0}
          variant={cartItem ? "secondary" : "default"}
        >
          <ShoppingCart className="h-4 w-4" />
          {cartItem ? `In Cart (${cartItem.quantity})` : product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
