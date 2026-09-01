export function CategoryFilter({
  categories,
  selected,
}: {
  categories: any[]
  selected: string
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <a
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected === ""
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        }`}
        href="/products"
      >
        All
      </a>
      {categories.map((cat: any) => (
        <a
          key={cat.slug}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === cat.slug
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          href={`/products?category=${cat.slug}`}
        >
          {cat.name}
          {" "}
          (
          {cat.productCount}
          )
        </a>
      ))}
    </div>
  )
}
