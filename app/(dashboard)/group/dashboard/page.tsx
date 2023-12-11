'use client'
import { countdown } from '@/utils/countdown'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { QueryData } from '@supabase/supabase-js'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/EditEvent/EditEvent'
import Card from '@/components/Card/Card'
import Invites from '@/components/Invites/Invites'

type Invite = {
  id: number
  profile?: {
    id: string
    name: string
    email: string
    avatar: string
  }
  email: string
  name: string
}

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)
  const [invites, setInvites] = useState<Invite[] | null>([])
  const { user, event, setEvent, handleAside } = useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))
  const supabase = createClientComponentClient()

  const handleClick = async () => {
    console.log('clicked')
  }

  const getEvent = async () => {
    const userStatus = supabase
      .from('userStatus')
      .select(`id, status, event(id, name, date, sendReminder)`)
      .eq('userId', user.id)

    type userStatus = QueryData<typeof userStatus>

    const { data } = await userStatus

    if (data && data[0].event) {
      const event = data[0].event

      setEvent({
        // @ts-ignore
        id: event.id,
        // @ts-ignore
        name: event.name,
        // @ts-ignore
        date: event.date,
        // @ts-ignore
        sendReminder: event.sendReminder,
      })
    }
  }

  useEffect(() => {
    user.id !== '' && getEvent()
  }, [user])

  useEffect(() => {
    if (event.id !== '') {
      setLoading(false)
    }
  }, [event])

  return (
    <>
      {!loading && (
        <div className="mt-[90px] flex w-full">
          <Aside>
            <EditEvent />
          </Aside>
          <div className="flex w-full flex-col pr-12">
            <span className="-mb-10 ml-5 font-handwriting text-[31.5px] uppercase text-white">
              {weeks} Weeks & {days} Days UNTIL
            </span>
            <div className="flex justify-between">
              <h1 className="ml-5 font-condensed text-[116.89px] uppercase text-white">
                {event.name}
              </h1>
            </div>
            <Invites />
          </div>
        </div>
      )}
    </>
  )
}
