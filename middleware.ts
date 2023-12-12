import { createClient } from './utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const supabase = createClient(cookies())
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
      // @ts-ignore
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
