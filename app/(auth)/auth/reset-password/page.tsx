import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'

export default async function Home() {
  const supabase = createClient(cookies())
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const email = formData.get('email')
    const supabase = createClient(cookies())

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
