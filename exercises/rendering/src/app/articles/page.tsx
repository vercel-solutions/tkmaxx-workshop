import Link from "next/link"

import { getArticles, getCategories } from "@/api"

export const dynamic = "force-dynamic"

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const [articles, categories] = await Promise.all([getArticles(category), getCategories()])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Stories</h1>
        <p className="text-muted-foreground mt-2">
          Your one-stop-shop for style tips, gifting guides, campaign lowdowns and department
          spotlights
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          href="/articles"
        >
          All
        </Link>
        {categories.map(cat => (
          <Link
            key={cat.slug}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === cat.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
            href={`/articles?category=${cat.slug}`}
          >
            {cat.name}
            {" "}
            (
            {cat.articleCount}
            )
          </Link>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(article => (
          <Link
            key={article.id}
            className="bg-card border-border overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
            href={`/articles/${article.slug}`}
          >
            <img
              alt={article.title}
              className="h-48 w-full object-cover"
              src={article.image}
            />
            <div className="p-4">
              <span className="text-muted-foreground text-xs font-medium uppercase">
                {article.category}
              </span>
              <h3 className="mt-1 font-semibold">{article.title}</h3>
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{article.excerpt}</p>
              <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs">
                <span>{article.author.name}</span>
                <span>
                  {article.readTime}
                  {" "}
                  min read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
