# Rendering Strategies Workshop - TK Maxx Edition

> **Slides:** [https://tkmaxx-workshop.vercel.app/rendering](https://tkmaxx-workshop.vercel.app/rendering)


Welcome to TK Maxx's rendering strategies workshop! Learn when and how to use static, dynamic, and streaming rendering in Next.js.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of Next.js App Router
- Understanding of React Server Components

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Current Implementation

The TK Maxx Insider application (the editorial hub for style tips, gifting guides, and campaign lowdowns) currently makes every page dynamic using `force-dynamic`. This means:

- No pages are statically generated
- Every request hits the server
- No caching or revalidation
- Sequential data fetches create waterfalls
- Blocking rendering

Check the console to see API calls and their delays.

## Tasks

### Task 1: Identify Rendering Strategies

Add comments to each page identifying:
- Current rendering mode
- What the correct rendering mode should be
- Why did you choose that mode

### Task 2: Static Article Pages

Convert article detail pages from `force-dynamic` to static:
- Add `generateStaticParams` using `getAllArticleSlugs()`
- Remove `export const dynamic = "force-dynamic"`

### Task 3: Homepage ISR

Convert the homepage to use Incremental Static Regeneration:
- Remove `force-dynamic`
- Add `export const revalidate = 60` for 60-second revalidation

### Task 4: Dashboard Streaming

The dashboard MUST stay dynamic (it uses `cookies()`), but add Suspense boundaries:
- Wrap stats, preferences, and recent articles in separate `<Suspense>` boundaries
- Add proper skeleton fallbacks for progressive loading

### Task 5: Articles Page Streaming

The articles page uses `searchParams` (making it dynamic). Isolate the dynamic part:
- Use Suspense to wrap the article list so the page shell loads instantly
- The category filter and header should render immediately

### Task 6: Bonus — Dynamic Params

Add `dynamicParams = false` to the article detail page so unknown slugs return 404 instead of rendering dynamically.

## Resources

- [Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

---

**Happy coding!** 🚀
