"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: number
  quantity: number
  image: string
  featured?: boolean
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 149.99,
    quantity: 15,
    image: "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Primary_image_Midnight_Blue?$mediaCarouselSmall$&fmt=png-alpha",
    featured: true,
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    description: "Comfortable ergonomic chair with lumbar support and adjustable armrests.",
    price: 299.99,
    quantity: 3,
    image: "https://flexispot.ph/wp-content/uploads/2021/05/C7x800x800.webp",
    featured: true,
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    category: "Sports",
    description: "Double-wall insulated water bottle keeps drinks cold for 24 hours.",
    price: 34.99,
    quantity: 50,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGwpbOLlVwpGC6amZ1Fqu-gcO1uoAz7a4gg&s",
  },
  {
    id: "4",
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    description: "RGB mechanical keyboard with Cherry MX switches and programmable keys.",
    price: 129.99,
    quantity: 8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WBSapMsbbZqV_p6sOyhhY10q_3lKEPRa4A&s",
    featured: true,
  },
]

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts([...products, { ...product, id: Date.now().toString() }])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, selectedCategory, setSelectedCategory }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) throw new Error("useProducts must be used within a ProductProvider")
  return context
}
