import {
  createServerComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database.types'
import Link from 'next/link'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from '@/components/ShowHidePassword/ShowHidePassword'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  const handleSignIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    const supabase = createServerActionClient<Database>({ cookies })

    if (!email || !password) {
      return
    }

    await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    })
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="LOGIN" />
      <form action={handleSignIn} className="flex flex-col gap-4">
        <input type="text" name="email" placeholder="Email" tabIndex={1} />
        <ShowHidePassword name="password" />
        <button type="submit" tabIndex={3}>
          Login
        </button>
      </form>
      <Link
        href="/signup"
        className="mt-4 text-center text-xl underline"
        tabIndex={4}
      >
        Need an Account?
      </Link>
      <Link
        href="/account/reset-password"
        className="text-center text-xl underline"
        tabIndex={5}
      >
        Forgot Password?
      </Link>
    </div>
  )
}
