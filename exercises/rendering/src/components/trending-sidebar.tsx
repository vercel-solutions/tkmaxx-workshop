import type { Article } from "@/api"

import Link from "next/link"

export function TrendingSidebar({ articles }: { articles: Article[] }) {
  return (
    <aside>
      <h2 className="mb-4 text-2xl font-bold">Trending on Insider</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
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
  )
}
