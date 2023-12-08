import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (session && req.nextUrl.pathname === '/dashboard') {
    const { data } = await supabase
      .from('userStatus')
      .select(`id, status, event(*)`)
      .eq('userId', session.user.id)

    if (data && data.length > 0) {
      return NextResponse.redirect(new URL('/group/invite', req.url))
    } else {
      return NextResponse.redirect(new URL('/event/new', req.url))
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/event/new',
    '/group/invite',
    '/account-update-password',
  ],
}
