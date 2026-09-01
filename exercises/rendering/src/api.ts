import { faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Article = ReturnType<typeof generateData>["articles"][number]

export type Category = ReturnType<typeof generateData>["categories"][number]

function generateData() {
  faker.seed(123)

  const categories = [
    { name: "Men", slug: "men", articleCount: 0 },
    { name: "Women", slug: "women", articleCount: 0 },
    { name: "Kids & Baby", slug: "kids", articleCount: 0 },
    { name: "Home", slug: "home", articleCount: 0 },
    { name: "Beauty", slug: "beauty", articleCount: 0 },
  ]

  // Fictional TK Maxx Insider editorial stories — titles[i] matches categories[i % 5]
  const titles = [
    "Style Tips: Layering Menswear Like a Die-Hard TK Maxxer",
    "Style Tips: Womenswear Capsule Looks From £12, Yes Really",
    "Style Tips: Kids & Baby Outfits With Big Labels, Small Prices",
    "Style Tips: Restyle Your Shelves With Ever-Changing Homeware",
    "Style Tips: Build a Beauty Routine at Up to 60% Less",
    "Gifting Guide: Menswear Presents They'll Actually Wear",
    "Gifting Guide: Womenswear Treats From £15 for Every Occasion",
    "Gifting Guide: Kids & Baby Gifts for Every Budget",
    "Gifting Guide: Homeware They'll Swear Cost a Fortune",
    "Gifting Guide: Beauty Sets With Rewards Galore",
    "How to TK to the Maxx: Working the Menswear Rails",
    "How to TK to the Maxx: Finding Womenswear Gems in Store",
    "How to TK to the Maxx: Shopping Kids & Baby Without the Chaos",
    "How to TK to the Maxx: Hunting Homeware at Your Local Store",
    "How to TK to the Maxx: Decoding the Beauty Aisle",
    "Treasure Explained: Collect Keys on Every Menswear Shop",
    "Lovelist 101: Save Womenswear Wins Before They Vanish",
    "Treasure Explained: Unlock Rewards on Kids & Baby Hauls",
    "Lovelist 101: Keep Tabs on Homeware You Can't Stop Thinking About",
    "Treasure Explained: Rewards Galore on Beauty Buys",
    "Gold Label Lowdown: Designer Menswear at Small Prices",
    "Pre-Loved Picks: Womenswear Worth a Second Look",
    "Clearance Countdown: Kids & Baby Bargains at Up to 60% Less",
    "Sister Brand Spotlight: How Homesense Does Homeware",
    "Campaign Lowdown: The Beauty Refresh Hitting Stores Now",
  ]

  const articles = []

  for (let i = 0; i < 25; i++) {
    const cat = categories[i % 5]
    const title = titles[i]

    articles.push({
      id: faker.string.uuid(),
      title,
      slug: faker.helpers.slugify(title).toLowerCase(),
      excerpt: faker.lorem.paragraph(2),
      content: faker.lorem.paragraphs(8, "\n\n"),
      category: cat.slug,
      author: {
        name: faker.person.fullName(),
        avatar: `https://avatars.githubusercontent.com/u/${faker.number.int({ min: 1000, max: 99999 })}`,
      },
      publishedAt: faker.date.recent({ days: 30 }).toISOString(),
      readTime: faker.number.int({ min: 3, max: 15 }),
      image: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/800/400`,
      views: faker.number.int({ min: 100, max: 50000 }),
    })

    cat.articleCount++
  }

  articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return { categories, articles }
}

const { categories: CATEGORIES, articles: ARTICLES } = generateData()

export async function getLatestArticles(): Promise<Article[]> {
  console.info("[API] Fetching latest articles (500ms delay)")

  await delay(500)

  return ARTICLES.slice(0, 10)
}

export async function getTrendingArticles(): Promise<Article[]> {
  console.info("[API] Fetching trending articles (1500ms delay)")

  await delay(1500)

  return ARTICLES.toSorted((a, b) => b.views - a.views).slice(0, 5)
}

export async function getArticles(category?: string): Promise<Article[]> {
  console.info(
    `[API] Fetching articles${category ? ` for category: ${category}` : ""} (500ms delay)`,
  )

  await delay(500)

  if (category) {
    return ARTICLES.filter(a => a.category === category)
  }

  return ARTICLES
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  console.info(`[API] Fetching article: ${slug} (200ms delay)`)

  await delay(200)

  return ARTICLES.find(a => a.slug === slug) ?? null
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return ARTICLES.map(a => a.slug)
}

export async function getCategories(): Promise<Category[]> {
  console.info("[API] Fetching categories (100ms delay)")

  await delay(100)

  return CATEGORIES
}

export async function getDashboardStats(): Promise<{
  totalArticles: number
  totalViews: number
  topCategory: string
  recentPublished: number
}> {
  console.info("[API] Fetching dashboard stats (800ms delay)")

  await delay(800)

  const totalViews = ARTICLES.reduce((sum, a) => sum + a.views, 0)
  const categoryCounts = CATEGORIES.toSorted((a, b) => b.articleCount - a.articleCount)

  return {
    totalArticles: ARTICLES.length,
    totalViews,
    topCategory: categoryCounts[0].name,
    recentPublished: ARTICLES.filter(
      a => new Date(a.publishedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length,
  }
}

export async function getUserPreferences(): Promise<{
  savedArticles: string[]
  preferredCategories: string[]
  lastVisited: string
}> {
  console.info("[API] Fetching user preferences (600ms delay)")

  await delay(600)

  return {
    savedArticles: ARTICLES.slice(0, 3).map(a => a.slug),
    preferredCategories: ["women", "home"],
    lastVisited: new Date().toISOString(),
  }
}
