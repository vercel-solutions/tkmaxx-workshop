import { cookies } from "next/headers"

import { getDashboardStats, getLatestArticles, getUserPreferences } from "@/api"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get("theme")?.value ?? "system"

  const stats = await getDashboardStats()
  const preferences = await getUserPreferences()
  const recentArticles = await getLatestArticles()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Your personalised TK Maxx Insider editorial dashboard (theme:
          {" "}
          {theme}
          )
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border-border rounded-lg border p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Stories</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalArticles}</p>
        </div>
        <div className="bg-card border-border rounded-lg border p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Views</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-card border-border rounded-lg border p-6">
          <p className="text-muted-foreground text-sm font-medium">Top Department</p>
          <p className="mt-2 text-3xl font-bold">{stats.topCategory}</p>
        </div>
        <div className="bg-card border-border rounded-lg border p-6">
          <p className="text-muted-foreground text-sm font-medium">Published This Week</p>
          <p className="mt-2 text-3xl font-bold">{stats.recentPublished}</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Your Preferences</h2>
        <div className="bg-card border-border rounded-lg border p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Preferred Departments</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {preferences.preferredCategories.map(cat => (
                  <span
                    key={cat}
                    className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm capitalize"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Saved Stories</p>
              <p className="mt-2 text-lg font-semibold">
                {preferences.savedArticles.length}
                {" "}
                saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Recent Stories</h2>
        <div className="space-y-3">
          {recentArticles.slice(0, 5).map(article => (
            <div
              key={article.id}
              className="bg-card border-border flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {article.category}
                  {" "}
                  ·
                  {article.readTime}
                  {" "}
                  min read
                </p>
              </div>
              <span className="text-muted-foreground text-sm">
                {article.views.toLocaleString()}
                {" "}
                views
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
