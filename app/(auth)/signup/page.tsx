import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import HeaderWithRulers from '@/components/HeaderWithRulers'
import ShowHidePassword from '@/components/ShowHidePassword'

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
    const password = formData.get('password')
    const name = formData.get('name')
    const supabase = createClient(cookies())

    if (!email || !password) {
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
      options: {
        data: {
          name: name,
        },
      },
    })

    console.log(data, error)
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="SIGN UP" />
      <form action={handleSignUp} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" tabIndex={1} />
        <input type="text" name="email" placeholder="Email" tabIndex={2} />
        <ShowHidePassword name="password" tabIndex={3} />
        <button type="submit" tabIndex={4}>
          Submit
        </button>
      </form>
      <Link href="/" className="my-4 w-full text-center text-xl underline">
        Need to Login?
      </Link>
    </div>
  )
}
