import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { Database } from './types/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (session && req.nextUrl.pathname === '/dashboard') {
    const { data } = await supabase
      .from('userStatus')
      .select(`event(id), profile(role)`)
      .eq('userId', session.user.id)

    if (data && data.length > 0 && data[0].profile) {
      if (data[0].profile.role === 'ADMIN') {
        return NextResponse.redirect(new URL(`/group/invite`, req.url))
      } else {
        return NextResponse.redirect(new URL(`/group/dashboard`, req.url))
      }
    } else {
      return NextResponse.redirect(new URL(`/event/new`, req.url))
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/event/new',
    '/group/invite',
    '/group/dashboard',
    '/account-update-password',
  ],
}
