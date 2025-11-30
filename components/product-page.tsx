"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context"
import Header from "./headers"
import ProductList from "./product-list"
import ProductDetail from "./product-detail"
import AddProductForm from "./add-product-form"
import CartSidebar from "./cart-sidebar"

export default function ProductPage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { products } = useProducts()

  const selectedProduct = products.find((p) => p.id === selectedProductId)

  return (
    <div className="min-h-screen bg-background">
      <Header onShowAddForm={() => setShowAddForm(true)} onShowCart={() => setShowCart(true)} />

      <main className="container mx-auto px-4 py-8">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={() => setSelectedProductId(null)} />
        ) : (
          <ProductList onSelectProduct={setSelectedProductId} />
        )}
      </main>

      {showAddForm && <AddProductForm onClose={() => setShowAddForm(false)} />}
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </div>
  )
}
