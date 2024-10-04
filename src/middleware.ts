import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL('/login', request.url).toString())
    }
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (request.nextauth.token.role !== 'admin') {
        return NextResponse.rewrite(new URL('/', request.url).toString())
      }
    }
  },
  {
    callbacks: { authorized: ({ token }) => !!token }
  }
)

export const config = { matcher: ['/'] }
