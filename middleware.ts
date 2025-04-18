import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rediriger les requêtes au sitemap.xml statique vers l'API route
  if (request.nextUrl.pathname === '/sitemap.xml') {
    return NextResponse.rewrite(new URL('/api/sitemap', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/sitemap.xml']
}
