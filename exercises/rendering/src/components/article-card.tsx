import type { Article } from "@/api"

import Link from "next/link"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
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
  )
}
