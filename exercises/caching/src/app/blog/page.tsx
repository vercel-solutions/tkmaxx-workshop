import { getBlogPosts, getCategories } from "@/api"
import BlogPosts from "@/components/blog-posts"
import CategoryFilter from "@/components/category-filter"

export const dynamic = "force-dynamic"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const [categories, posts] = await Promise.all([getCategories(), getBlogPosts(category)])

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <header>
        <h1 className="mb-4 text-4xl font-bold">New In & Trending</h1>
        <p className="text-muted-foreground">
          Big Labels, Small Prices — and ever-changing selections that turn every visit into a
          treasure hunt. Browse the latest finds across Men, Women, Kids & Baby, Home, and
          Beauty, with big brands and designer labels at small prices — up to 60% less than the
          RRP. Yesterday's finds may be gone, and today's are just landing.
        </p>
      </header>

      <CategoryFilter categories={categories} />

      <BlogPosts posts={posts} />
    </div>
  )
}
