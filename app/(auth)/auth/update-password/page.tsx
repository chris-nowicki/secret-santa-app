import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import HeaderWithRulers from '@/components/HeaderWithRulers'

export default async function Home() {
  const handleSignUp = async (formData: FormData) => {
    'use server'
    const password = formData.get('password')
    const supabase = createClient(cookies())

    if (!password) {
      return
    }

    await supabase.auth.updateUser({
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
