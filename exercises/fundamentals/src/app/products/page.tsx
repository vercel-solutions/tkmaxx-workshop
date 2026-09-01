"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { CategoryFilter } from "@/components/category-filter"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category") ?? ""

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/products?type=categories").then(res => res.json()),
    ]).then(([productsData, categoriesData]) => {
      setProducts(productsData)
      setCategories(categoriesData)
      setLoading(false)
    })
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter((p: any) => p.category === selectedCategory)
    : products

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Menswear</h1>
        <p className="text-muted-foreground mt-2">
          Ever-changing selections of big brands and designer labels at small prices — new finds
          land all the time, so the die-hard TK Maxxer checks back often
        </p>
      </div>

      <CategoryFilter categories={categories} selected={selectedCategory} />

      {loading
        ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-muted h-80 animate-pulse rounded-lg" />
              ))}
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
    </div>
  )
}
