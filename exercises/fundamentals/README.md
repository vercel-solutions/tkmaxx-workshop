# Next.js Fundamentals Workshop - TK Maxx Edition

> **Slides:** [https://tkmaxx-workshop.vercel.app/fundamentals](https://tkmaxx-workshop.vercel.app/fundamentals)


Welcome to TK Maxx's Next.js fundamentals workshop! Learn core Next.js concepts by migrating a client-side React app to use proper Next.js patterns.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of React
- Understanding of client vs server rendering concepts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Current Implementation (Anti-Patterns)

The TK Maxx Product Catalog currently works but uses several anti-patterns.

## Tasks

### Task 1: Convert Homepage to Server Component

Remove `'use client'` and `useEffect` from the homepage. Import data functions directly and make the component `async`.

### Task 2: Replace `<a>` with `<Link>`

Replace all `<a>` tags with Next.js `<Link>` components for client-side navigation. Update both `product-card.tsx` and `category-filter.tsx`.

### Task 3: Create Product Detail Page

Create `/products/[slug]/page.tsx` as a dynamic route:
- Use `params` to get the product slug
- Fetch the product using `getProductBySlug()`
- Call `notFound()` if product doesn't exist
- Display full product details

### Task 4: Add Loading States

Add `loading.tsx` to the products route for instant loading feedback. Consider adding Suspense boundaries for individual sections.

### Task 5: Add Error Handling

Add `error.tsx` for runtime errors and ensure `not-found.tsx` works for missing products.

### Task 6: Server Action Form

Add a "Contact Us" form on the product detail page using a Server Action.

### Task 7: Bonus — generateStaticParams

Add `generateStaticParams` to the product detail page to pre-generate featured products at build time.

## Resources

- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**Happy coding!** 🚀
