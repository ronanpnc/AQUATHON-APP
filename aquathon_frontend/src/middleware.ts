import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /races/
  if (pathname.startsWith('/races/')) {
    const segments = pathname.split('/')

    // If it's exactly /races/create, don't redirect
    if (segments[2] === 'create') {
      return NextResponse.next()
    }

    // If it's /races/<something> but not /races/<something>/participants, redirect
    if (segments.length === 3 && segments[2] !== 'participants') {
      return NextResponse.redirect(new URL(`${pathname}/participants`, request.url))
    }
  }

  // For all other cases, continue as normal
  return NextResponse.next()
}

export const config = {
  matcher: '/races/:path*',
}
