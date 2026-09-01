import { faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Product = ReturnType<typeof generateData>["products"][number]

export type Category = ReturnType<typeof generateData>["categories"][number]

function generateData() {
  faker.seed(123)

  const categories = [
    { name: "Jackets & Coats", slug: "jackets-coats", productCount: 0 },
    { name: "Knitwear", slug: "knitwear", productCount: 0 },
    { name: "Tailoring", slug: "tailoring", productCount: 0 },
    { name: "Hoodies & Sweats", slug: "hoodies-sweats", productCount: 0 },
    { name: "T-shirts", slug: "t-shirts", productCount: 0 },
  ]

  // Fictional labels only — no real third-party brands in sample data.
  const brands = [
    "MERIDIAN & CO",
    "FENWICK LANE",
    "ASHCOMBE & FINCH",
    "HARLAND SUPPLY CO",
    "OSSIAN & FRAY",
    "BECKETT MILL",
    "CALDER & VANE",
    "GREYFORD & SONS",
  ]

  // Fictional menswear finds — one list per category, in category order.
  // Descriptions follow the short-attribute style used on product pages.
  const catalogueByCategory: { name: string, description: string }[][] = [
    [
      { name: "Double-Breasted Wool-Blend Overcoat", description: "Double-breasted front · Wool-blend fabric · Notch lapels · Fully lined · Dry clean only" },
      { name: "Quilted Funnel-Neck Puffer Jacket", description: "Funnel neck · Quilted padding · Zip-through front · Side pockets · Water-resistant finish" },
      { name: "Borg-Collar Cotton Trucker Jacket", description: "Borg collar · Pure cotton outer · Button fastening · Twin chest pockets · Machine washable" },
      { name: "Longline Hooded Padded Parka", description: "Longline cut · Detachable hood · Padded lining · Zip and popper front · Drawcord waist" },
      { name: "Herringbone Single-Breasted Blazer", description: "Herringbone weave · Single-breasted · Notch lapels · Internal pocket · Fully lined" },
      { name: "Waxed Cotton Field Jacket", description: "Waxed cotton finish · Corduroy collar · Four-pocket front · Storm cuffs · Showerproof" },
      { name: "Faux-Leather Biker Jacket", description: "Faux leather · Asymmetric zip · Press-stud collar · Zipped cuffs · Quilted shoulder panels" },
      { name: "Hooded Showerproof Rain Mac", description: "Showerproof shell · Fixed hood · Zip-through front · Lightweight · Packable design" },
    ],
    [
      { name: "Merino Crew Neck Jumper", description: "Crew neckline · Fine merino wool · Ribbed cuffs and hem · Lightweight knit · Hand wash" },
      { name: "Chunky Cable-Knit Jumper", description: "Cable-knit front · Chunky knit · Crew neckline · Ribbed trims · Relaxed fit" },
      { name: "Cotton Roll-Neck Jumper", description: "Roll neck · Pure cotton · Fine-gauge knit · Ribbed trims · Machine washable" },
      { name: "Lambswool-Blend Cardigan", description: "Button-through front · Lambswool blend · Two front pockets · Ribbed cuffs · Regular fit" },
      { name: "Half-Zip Funnel-Neck Jumper", description: "Half-zip fastening · Funnel neck · Midweight knit · Ribbed trims · Regular fit" },
      { name: "Textured V-Neck Jumper", description: "V-neckline · Textured knit · Cotton-rich yarn · Ribbed cuffs and hem · Machine washable" },
      { name: "Striped Crew Neck Knit", description: "Breton stripe · Crew neckline · Soft-touch yarn · Ribbed trims · Regular fit" },
      { name: "Zip-Through Knitted Jacket", description: "Full-zip front · Midweight knit · Two zip pockets · Stand collar · Regular fit" },
    ],
    [
      { name: "Double-Breasted Wool-Blend Blazer", description: "Double-breasted · Wool-blend fabric · Peak lapels · Fully lined · Dry clean only" },
      { name: "Slim-Fit Two-Button Suit Jacket", description: "Slim fit · Single-breasted · Two-button front · Notch lapels · Fully lined" },
      { name: "Tailored Wool-Mix Suit Trousers", description: "Tailored fit · Wool-mix fabric · Flat front · Belt loops · Dry clean only" },
      { name: "Textured Slim-Fit Waistcoat", description: "Slim fit · Textured weave · Five-button front · Adjustable back strap · Fully lined" },
      { name: "Pleat-Front Smart Trousers", description: "Pleated front · Tapered leg · Side-adjuster waist · Pressed crease · Machine washable" },
      { name: "Linen-Blend Summer Blazer", description: "Linen-blend fabric · Single-breasted · Patch pockets · Half-lined · Lightweight" },
      { name: "Slim-Fit Double-Cuff Formal Shirt", description: "Slim fit · Cotton-rich · Cutaway collar · Double cuffs · Machine washable" },
      { name: "Checked Slim-Fit Suit Trousers", description: "Check pattern · Slim fit · Flat front · Belt loops · Machine washable" },
    ],
    [
      { name: "Pullover Fleece-Lined Hoodie", description: "Pullover style · Fleece-lined · Drawstring hood · Kangaroo pocket · Ribbed cuffs and hem" },
      { name: "Zip-Through Jersey Hoodie", description: "Full-zip front · Soft jersey · Drawstring hood · Two front pockets · Machine washable" },
      { name: "Oversized Crew Neck Sweatshirt", description: "Oversized fit · Brushed-back fleece · Crew neckline · Dropped shoulders · Ribbed trims" },
      { name: "Colour-Block Panel Hoodie", description: "Colour-block panels · Drawstring hood · Kangaroo pocket · Ribbed cuffs · Regular fit" },
      { name: "Quarter-Zip Funnel Sweatshirt", description: "Quarter-zip · Funnel neck · Brushed-back fleece · Ribbed trims · Regular fit" },
      { name: "Waffle-Knit Crew Sweatshirt", description: "Waffle texture · Crew neckline · Cotton-rich fabric · Ribbed cuffs and hem · Machine washable" },
      { name: "Borg-Lined Zip Hoodie", description: "Borg lining · Full-zip front · Drawstring hood · Two zip pockets · Midweight warmth" },
      { name: "Garment-Dyed Washed Sweatshirt", description: "Garment-dyed finish · Washed effect · Crew neckline · Pure cotton · Relaxed fit" },
    ],
    [
      { name: "Regular-Fit Pure Cotton T-Shirt", description: "Regular fit · Pure cotton · Crew neckline · Short sleeves · Machine washable" },
      { name: "Slub-Texture Crew Neck T-Shirt", description: "Slub texture · Crew neckline · Cotton-rich · Short sleeves · Regular fit" },
      { name: "Striped Short-Sleeve T-Shirt", description: "Breton stripe · Crew neckline · Pure cotton · Short sleeves · Machine washable" },
      { name: "Oversized Heavyweight T-Shirt", description: "Oversized fit · Heavyweight cotton · Dropped shoulders · Ribbed collar · Machine washable" },
      { name: "Long-Sleeve Jersey Top", description: "Long sleeves · Soft jersey · Crew neckline · Ribbed cuffs · Regular fit" },
      { name: "V-Neck Cotton-Stretch T-Shirt", description: "V-neckline · Cotton-stretch fabric · Short sleeves · Slim fit · Machine washable" },
      { name: "Pocket-Front Washed T-Shirt", description: "Chest pocket · Washed finish · Pure cotton · Crew neckline · Regular fit" },
      { name: "Textured Waffle T-Shirt", description: "Waffle texture · Crew neckline · Cotton-rich · Short sleeves · Relaxed fit" },
    ],
  ]

  const products = []

  for (let i = 0; i < 40; i++) {
    const cat = categories[i % 5]
    const item = catalogueByCategory[i % 5][Math.floor(i / 5)]
    const price = Number.parseFloat(faker.commerce.price({ min: 7.99, max: 199.99 }))
    // RRP keeps "up to 60% less than the RRP" honest — never more than 60% off.
    const rrp = Number((price * faker.number.float({ min: 1.7, max: 2.45, fractionDigits: 2 })).toFixed(2))

    products.push({
      id: faker.string.uuid(),
      brand: faker.helpers.arrayElement(brands),
      name: item.name,
      slug: faker.helpers.slugify(item.name).toLowerCase(),
      description: item.description,
      price,
      rrp,
      category: cat.slug,
      image: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/800/600`,
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviewCount: faker.number.int({ min: 0, max: 500 }),
      inStock: faker.datatype.boolean({ probability: 0.8 }),
      featured: i < 8,
    })

    cat.productCount++
  }

  return { categories, products }
}

const { categories: CATEGORIES, products: PRODUCTS } = generateData()

export async function getProducts(category?: string): Promise<Product[]> {
  console.info(
    `[API] Fetching products${category ? ` for category: ${category}` : ""} (300ms delay)`,
  )

  await delay(300)

  if (category) {
    return PRODUCTS.filter(p => p.category === category)
  }

  return PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  console.info(`[API] Fetching product: ${slug} (200ms delay)`)

  await delay(200)

  return PRODUCTS.find(p => p.slug === slug) ?? null
}

export async function getCategories(): Promise<Category[]> {
  console.info("[API] Fetching categories (100ms delay)")

  await delay(100)

  return CATEGORIES
}

export async function getFeaturedProducts(): Promise<Product[]> {
  console.info("[API] Fetching featured products (250ms delay)")

  await delay(250)

  return PRODUCTS.filter(p => p.featured)
}
