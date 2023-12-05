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

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = formData.get('email')
    const password = formData.get('password')
    const firstName = formData.get('firstName')
    const supabase = createServerActionClient<Database>({ cookies })

    if (!email || !password) {
      return
    }

    await supabase.auth.signUp({
      email: email as string,
      password: password as string,
      options: {
        data: {
          firstName: firstName,
        },
      },
    })
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="SIGN UP" />
      <form action={handleSignUp} className="flex flex-col gap-4">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="email" placeholder="Email" />
        <ShowHidePassword name="password" />
        <button type="submit">Submit</button>
      </form>
      <Link href="/" className="my-4 w-full text-center text-xl underline">
        Need to Login?
      </Link>
    </div>
  )
}
