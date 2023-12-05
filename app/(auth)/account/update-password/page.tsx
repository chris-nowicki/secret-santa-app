import {
  createServerComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database.types'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const handleSignUp = async (formData: FormData) => {
    'use server'
    const password = formData.get('password')
    const supabase = createServerActionClient<Database>({ cookies })

    if (!password) {
      return
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password as string,
    })

    redirect('/')
  }

  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="RESET PASSWORD" />
      <form action={handleSignUp} className="flex flex-col gap-4">
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
