import {
  createServerComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database.types'
import Link from 'next/link'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = formData.get('email')
    const supabase = createServerActionClient<Database>({ cookies })

    if (!email) {
      return
    }

    await supabase.auth.resetPasswordForEmail(`${email}`, {
      redirectTo: `http://localhost:3000/auth/callback?next=http://localhost:3000/account/update-password`,
    })

    redirect('/')
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="RESET PASSWORD" />
      <form action={handleSignUp} className="flex flex-col gap-4">
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
      <Link href="/" className="my-4 w-full text-center text-xl underline">
        Need to Login?
      </Link>
    </div>
  )
}
