"use client"

import { useEffect, useState } from "react"

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then(res => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to TK Maxx</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          You've only gone and stumbled upon big brands and designer labels at small prices —
          up to 60% less* than the RRP. Yes, really.
        </p>
        <p className="text-muted-foreground mt-1 text-xs">*Less than the RRP</p>
      </div>

      {loading
        ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted h-72 animate-pulse rounded-lg" />
              ))}
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product: any) => (
                <a
                  key={product.id}
                  className="bg-card border-border overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                  href={`/products/${product.slug}`}
                >
                  <img
                    alt={product.name}
                    className="h-48 w-full object-cover"
                    src={product.image}
                  />
                  <div className="p-4">
                    <p className="text-xs font-bold tracking-wide uppercase">{product.brand}</p>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm">
                      <span className="font-bold">
                        £
                        {product.price.toFixed(2)}
                      </span>
                      {" "}
                      <span className="text-muted-foreground text-xs">
                        RRP £
                        {product.rrp.toFixed(2)}
                      </span>
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-sm">
                        ⭐
                        {product.rating}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        (
                        {product.reviewCount}
                        {" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

      <div className="mt-12 text-center">
        <a
          className="bg-primary text-primary-foreground inline-flex items-center rounded-lg px-6 py-3 font-medium transition-opacity hover:opacity-90"
          href="/products"
        >
          Shop All Menswear
        </a>
      </div>
    </div>
  )
}
