'use client'
import { countdown } from '@/utils/countdown'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/EditEvent/EditEvent'
import RsvpStatus from '@/components/RsvpStatus/RsvpStatus'
import Invites from '@/components/Invites/Invites'
import EditAccount from '@/components/EditAccount/EditAccount'

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)

  const {
    user,
    event,
    setEvent,
    statusCount,
    setStatusCount,
    filteredInviteData,
  } = useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))
  const supabase = createClient()

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

  const getStatusCount = async () => {
    const userStatus = supabase
      .from('userStatus')
      .select('status')
      .eq('eventId', event.id)

    type userStatus = QueryData<typeof userStatus>

    const { data } = await userStatus

    if (data) {
      const declined = data.filter((status) => status.status === 'DECLINED')
      const pending = data.filter((status) => status.status === 'INVITED')
      const accepted = data.filter((status) => status.status === 'ACCEPTED')

      setStatusCount({
        ...statusCount,
        declined: declined.length,
        invited: pending.length,
        accepted: accepted.length,
      })
    }
  }

  useEffect(() => {
    if (user.id !== '') {
      getEvent()
    }
  }, [user])

  useEffect(() => {
    getStatusCount()
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
            </div>

            {/* RSVP status buttons */}
            <div className="mb-20 mt-8 flex w-full items-center gap-20 pl-5">
              <RsvpStatus
                heading="declined"
                status="error"
                count={statusCount.declined}
                disabled={
                  filteredInviteData.filter != 'ALL' &&
                  filteredInviteData.filter != 'DECLINED'
                }
                clearFilter={{
                  isShowing: filteredInviteData.filter === 'DECLINED',
                }}
              />

              <RsvpStatus
                heading="pending"
                status="warning"
                count={statusCount.invited}
                disabled={
                  filteredInviteData.filter != 'ALL' &&
                  filteredInviteData.filter != 'INVITED'
                }
                clearFilter={{
                  isShowing: filteredInviteData.filter === 'INVITED',
                }}
              />

              <RsvpStatus
                heading="accepted"
                status="success"
                count={statusCount.accepted}
                disabled={
                  filteredInviteData.filter != 'ALL' &&
                  filteredInviteData.filter != 'ACCEPTED'
                }
                clearFilter={{
                  isShowing: filteredInviteData.filter === 'ACCEPTED',
                }}
              />
            </div>
            <Invites isCloseShowing={false} />
          </div>
        </div>
      )}
    </>
  )
}
