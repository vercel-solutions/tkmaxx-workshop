export function ProductCard({ product }: { product: any }) {
  const saving = product.rrp - product.price
  const discount = Math.round((saving / product.rrp) * 100)

  return (
    <a
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
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{product.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-bold">
              £
              {product.price.toFixed(2)}
            </span>
            <span className="text-muted-foreground text-xs">
              RRP £
              {product.rrp.toFixed(2)}
            </span>
          </div>
          <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-xs font-bold">
            -
            {discount}
            %
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-primary text-sm font-semibold">
            Save £
            {saving.toFixed(2)}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              product.inStock
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-sm">
            ⭐
            {product.rating}
          </span>
          <span className="text-muted-foreground text-sm">
            (
            {product.reviewCount}
            )
          </span>
        </div>
      </div>
    </a>
  )
}
