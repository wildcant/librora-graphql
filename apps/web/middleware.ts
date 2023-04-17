import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AUTH_TOKEN_COOKIE_KEY } from '~store/auth/constants'

const PRIVATE_ROUTES = ['']

export function middleware(request: NextRequest) {
  // If the user is trying to access a private route and there's no auth cookie redirect to sign in.
  const authCookie = request.cookies.get(AUTH_TOKEN_COOKIE_KEY)
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname) && !authCookie?.value) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}
