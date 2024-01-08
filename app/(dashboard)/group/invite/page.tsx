'use client'
import { useEffect, useState } from 'react'
import { countdown } from '@/utils/countdown'
import { useSecretSanta } from '@/context/SecretSantaContext'
import InviteGroup from '@/components/Invites/InviteGroup'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/Aside/EditEvent/EditEvent'
import EditAccount from '@/components/Aside/EditAccount/EditAccount'
import Loading from '@/components/UI/Spinner/LoadingSpinner'
import Admin from '@/components/Admin/Admin'
import { redirect } from 'next/navigation'

export default function GroupInvite() {
  const [loading, setLoading] = useState(true)
  const { user, event } = useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))

  useEffect(() => {
    if (event.id !== '') {
      setLoading(false)
    }
  }, [event])

  if (user.role !== 'ADMIN') {
    return redirect('/group/dashboard')
  }

  if (loading) return <Loading />

  return (
    <div className="mt-[90px] flex w-full">
      <Aside>
        <EditEvent />
        <EditAccount />
      </Aside>
      <div className="flex w-full flex-col pr-12">
        <span className="-mb-10 ml-5 font-handwriting text-[31.5px] uppercase text-white">
          {weeks} Weeks & {days} Days UNTIL
        </span>
        <div className="flex justify-between">
          <h1 className="ml-5 font-condensed text-[116.89px] uppercase text-white">
            {event.name}
          </h1>
          <Admin />
        </div>
        <InviteGroup />
      </div>
    </div>
  )
}
