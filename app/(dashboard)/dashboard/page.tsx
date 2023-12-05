import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database.types'
import Login from '@/components/Login'

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mt-20 text-4xl">Dashboard</h1>
      <Login />
    </div>
  )
}
