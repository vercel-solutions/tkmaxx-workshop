import { NextResponse } from "next/server"

import { getCategories, getFeaturedProducts, getProducts } from "@/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const featured = searchParams.get("featured")
  const category = searchParams.get("category")

  if (type === "categories") {
    const categories = await getCategories()

    return NextResponse.json(categories)
  }

  if (featured === "true") {
    const featuredProducts = await getFeaturedProducts()

    return NextResponse.json(featuredProducts)
  }

  const products = await getProducts(category ?? undefined)

  return NextResponse.json(products)
}
