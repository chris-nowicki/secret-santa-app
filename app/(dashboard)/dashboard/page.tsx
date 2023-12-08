'use client'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useEffect } from 'react'
import { RedirectType, useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  const supabase = createClientComponentClient()
  const { user, getEvent } = useSecretSanta()
  const router = useRouter()

  const handleCheckEvent = async () => {
    const { data, error } = await supabase
      .from('userStatus')
      .select('id, userId, status, eventId')
      .eq('userId', user?.id)

    if (data && data.length === 0) {
      redirect('/event/new', RedirectType.push)
    } else {
      redirect('/group/id', RedirectType.push)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mt-20 text-4xl">Dashboard</h1>
      <div className="mt-4">
        <Link href="/event/new" className="text-2xl">
          New Event
        </Link>
      </div>
    </div>
  )
}
