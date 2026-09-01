import Link from "next/link"

import { getLatestArticles, getTrendingArticles } from "@/api"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const latestArticles = await getLatestArticles()
  const trendingArticles = await getTrendingArticles()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">TK Maxx Insider</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your go-to hub for all things style tips, gifting guides, campaign lowdowns and much,
          much more
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Latest Articles */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">Latest</h2>
          <div className="space-y-6">
            {latestArticles.map(article => (
              <Link
                key={article.id}
                className="bg-card border-border flex gap-4 overflow-hidden rounded-lg border p-4 transition-shadow hover:shadow-lg"
                href={`/articles/${article.slug}`}
              >
                <img
                  alt={article.title}
                  className="hidden h-32 w-48 rounded-md object-cover sm:block"
                  src={article.image}
                />
                <div className="flex-1">
                  <span className="text-muted-foreground text-xs font-medium uppercase">
                    {article.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold">{article.title}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {article.excerpt}
                  </p>
                  <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                    <span>{article.author.name}</span>
                    <span>
                      {article.readTime}
                      {" "}
                      min read
                    </span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Sidebar */}
        <aside>
          <h2 className="mb-4 text-2xl font-bold">Trending on Insider</h2>
          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <Link
                key={article.id}
                className="bg-card border-border block rounded-lg border p-4 transition-shadow hover:shadow-lg"
                href={`/articles/${article.slug}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground text-2xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {article.views.toLocaleString()}
                      {" "}
                      views
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
