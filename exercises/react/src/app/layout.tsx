import type { Metadata } from "next"

import Link from "next/link"

import "./globals.css"

export const metadata: Metadata = {
  title: "TK Maxx Team Directory",
  description:
    "Meet the store team behind big brands and designer labels at small prices",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="bg-background sticky top-0 z-50 w-full border-b">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
              <div className="mr-4 flex">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                  <p className="text-2xl font-bold">TK Maxx</p>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="/"
                  >
                    Home
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          <footer className="border-t">
            <div className="container mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-muted-foreground text-center text-sm md:text-left">
                  Built by
                  {" "}
                  <a
                    className="hover:text-foreground font-medium underline underline-offset-4"
                    href="https://vercel.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Vercel
                  </a>
                  {" "}
                  for TK Maxx — big brands and designer labels at small prices.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
