# Next.js 16 Caching Migration Workshop - TK Maxx Edition

> **Slides:** [https://tkmaxx-workshop.vercel.app/caching](https://tkmaxx-workshop.vercel.app/caching)


Welcome to TK Maxx's Next.js 16 workshop! Learn how to migrate the TK Maxx "New In & Trending" feed to Cache Components and make every navigation instant. Off-price selections are ever-changing — big brands and designer labels land at small prices all the time — so the feed has to stay fresh *and* fast. That's exactly the problem caching solves.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of Next.js App Router
- Understanding of React Server Components

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000/blog
```

## Current Implementation

The blog runs on Next.js 16, but Cache Components is still **disabled** (`cacheComponents: false` in `next.config.ts`). The app uses the old patterns:

- `export const dynamic = 'force-dynamic'` for the blog page
- `export const dynamic = 'force-static'` for the homepage
- Mocked data with simulated API delays

Check the console to see API calls being logged.

## Migration Tasks

### Task 1: Enable Cache Components

Turn on the new caching model in `next.config.ts`:

```typescript
const nextConfig = {
  cacheComponents: true,
};
```

Restart the dev server and visit each page. The old `dynamic` exports now fail — read the errors carefully. Every error links to a `nextjs.org/docs/messages/...` page with the exact fix. The next tasks walk you through them.

### Task 2: Home page

Migrate the home page to the [`"use cache"`](https://nextjs.org/docs/app/api-reference/directives/use-cache) directive. Remember to keep the original [revalidation time](https://nextjs.org/docs/app/api-reference/functions/cacheLife) of 60 seconds.

### Task 3: Blog page

Migrate the blog page to Cache Components. Currently the entire page is dynamic because the posts depend on `searchParams`. Find a way of making the heading, layout, and categories static while keeping the posts dynamic.

> Hint: don't await `searchParams` at the top of the page — pass the promise into a Suspense-wrapped child and await it there. There's already a `BlogPostsSkeleton` you can use as the fallback.

### Task 4: Blog post page

Create a blog post page at `/blog/[slug]` where the post content is fully cached. Use [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag) to tag the cached data with the post slug.

> Hint: this route has no `generateStaticParams`, so the slug is only known at request time. Cache the data function, and keep the `params` read inside a Suspense boundary.

### Task 5: Revalidate the cache

Create a secured route to revalidate the cache of at least the blog post page. Use [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) with the `'max'` profile — `revalidateTag(tag, 'max')` serves the old content while the fresh version is prepared in the background. Calling it without the second argument is deprecated.

### Task 6: Add a dynamic featured posts section to blog post page

Add a dynamic section to the end of the blog post page to show the featured posts. It should fetch fresh data on every request and stream in behind a fallback, while the cached post content stays instant.

### Task 7: Verify instant navigation

Prove your work with the tools from the slides:

1. Run `pnpm build` and read the route glyphs: `/` should be `○ (Static)`, `/blog` and `/blog/[slug]` should be `◐ (Partial Prerender)`.
2. In dev, open the Next.js DevTools → **Navigation Inspector** → turn on **Pause on navigations**. Click from the home page to the blog: the heading and categories must appear frozen in the shell, with the posts skeleton where content will stream in.

Remember: `◐` only says a shell exists — the Inspector shows what's actually in it.

### Task 8: Enable Partial Prefetching

Turn on [`partialPrefetching`](https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching) in `next.config.ts`. Now every `<Link>` prefetches one shared App Shell per route.

Then upgrade the three featured post cards on the home page with [`prefetch={true}`](https://nextjs.org/docs/app/api-reference/components/link#prefetch), so their post content is ready before the click. Think about why you should **not** do the same for the 50 cards on the blog listing.

## Bonus Tasks

- Show the active category in the `category-filter` component.
- Create a custom cache profile in `next.config.ts` and use it.
- Add `generateStaticParams` to `/blog/[slug]` so the latest posts get fully prerendered pages.
- Write an [`instant()`](https://nextjs.org/docs/app/guides/instant-navigation#prevent-regressions-with-e2e-tests) e2e test with `@next/playwright` that guards the blog navigation.
- Deploy the application and verify everything works.

## Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- ["use cache" Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [cacheLife Function](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [cacheTag Function](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [revalidateTag Function](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Instant Navigation Guide](https://nextjs.org/docs/app/guides/instant-navigation)
- [Adopting Partial Prefetching](https://nextjs.org/docs/app/guides/adopting-partial-prefetching)

---

**Happy coding!** 🚀
