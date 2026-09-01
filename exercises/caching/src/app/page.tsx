import Link from "next/link"

import { getBlogPosts, getCategories, getFeaturedBlogPosts } from "@/api"
import BlogPosts from "@/components/blog-posts"

export const dynamic = "force-static"

export const revalidate = 60

async function getBlogStats() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getCategories()])

  return {
    totalPosts: posts.length,
    totalCategories: categories.length,
    avgReadTime: Math.round(posts.reduce((acc, post) => acc + post.readTime, 0) / posts.length),
  }
}

export default async function HomePage() {
  const [featuredPosts, stats] = await Promise.all([getFeaturedBlogPosts(), getBlogStats()])

  return (
    <main className="space-y-16">
      <section className="bg-card rounded-lg border px-6 py-16 text-center shadow-sm">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          TK Maxx New Arrivals
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
          Well, you've only gone and stumbled upon big brands and designer labels at small prices — up to 60% less than the RRP. Yes, really. Our selections are ever-changing, so every visit is a proper treasure hunt across Men, Women, Kids & Baby, Home, and Beauty: yesterday's finds may be gone, and today's are just landing.
        </p>
        <Link
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded px-8 text-sm font-medium transition-colors"
          href="/blog"
        >
          Browse New In & Trending
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
          <div className="text-primary text-3xl font-bold">{stats.totalPosts}</div>
          <div className="text-muted-foreground mt-2 text-sm">Total Posts</div>
        </div>
        <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
          <div className="text-primary text-3xl font-bold">{stats.totalCategories}</div>
          <div className="text-muted-foreground mt-2 text-sm">Categories</div>
        </div>
        <div className="bg-card rounded-lg border p-6 text-center shadow-sm">
          <div className="text-primary text-3xl font-bold">
            {stats.avgReadTime}
            {" "}
            min
          </div>
          <div className="text-muted-foreground mt-2 text-sm">Avg Read Time</div>
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Featured Posts</h2>
        <BlogPosts posts={featuredPosts} />
      </section>
    </main>
  )
}
