import { ProductProvider } from "@/context/product-context"
import { CartProvider } from "@/context/cart-context"
import ProductPage from "@/components/product-page"

export default function Home() {
  return (
    <ProductProvider>
      <CartProvider>
        <ProductPage />
      </CartProvider>
    </ProductProvider>
  )
}
