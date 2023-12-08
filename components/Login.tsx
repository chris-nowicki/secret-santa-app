'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import type { Database } from '@/types/database.types'

export default function Login() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email: 'cnowicki@gmail.com',
  //     password: 'thisismypassword',
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   })
  //   router.refresh()
  // }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="absolute left-0 top-2 flex gap-2">
      <button
        className="text-xl"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  )
}
