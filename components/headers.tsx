"use client"

import { ShoppingCart, Plus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface HeaderProps {
  onShowAddForm: () => void
  onShowCart: () => void
}

export default function Header({ onShowAddForm, onShowCart }: HeaderProps) {
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Product Manager</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onShowAddForm} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>

          <Button variant="outline" onClick={onShowCart} className="relative gap-2 bg-transparent">
            <ShoppingCart className="h-4 w-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
