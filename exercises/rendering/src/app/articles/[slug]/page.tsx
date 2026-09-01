import Link from "next/link"
import { notFound } from "next/navigation"

import { getArticleBySlug } from "@/api"

export const dynamic = "force-dynamic"

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
        href="/articles"
      >
        ← Back to Stories
      </Link>

      <img
        alt={article.title}
        className="mb-6 h-64 w-full rounded-lg object-cover md:h-96"
        src={article.image}
      />

      <div className="mb-4">
        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium uppercase">
          {article.category}
        </span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>

      <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <img
            alt={article.author.name}
            className="h-8 w-8 rounded-full"
            src={article.author.avatar}
          />
          <span>{article.author.name}</span>
        </div>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        <span>
          {article.readTime}
          {" "}
          min read
        </span>
        <span>
          {article.views.toLocaleString()}
          {" "}
          views
        </span>
      </div>

      <div className="prose prose-gray dark:prose-invert mt-8 max-w-none">
        {article.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-foreground/80 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
