'use client'
import { createClient } from '@/utils/supabase/client'
import HeaderWithRulers from '@/components/HeaderWithRulers'
import { useEffect } from 'react'

export default function NewEvent() {
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    handleLogout()

    // create a timeout function to return user to home page after 5 seconds
    const timeout = setTimeout(() => {
      window.location.href = '/'
    }, 5000)
  }, [])

  return (
    <div className="flex w-[700px] flex-col items-center">
      <HeaderWithRulers className=" text-white" heading="THANKS" />

      <h1 className="text-center font-condensed text-[110px] uppercase tracking-wide text-white">
        you'll be missed
      </h1>
    </div>
  )
}
