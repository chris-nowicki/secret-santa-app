'use client'
import { useCallback, useEffect, useState } from 'react'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/EditEvent/EditEvent'
import RsvpStatus from '@/components/RsvpStatus/RsvpStatus'
import Invites from '@/components/Invites/Invites'
import EditAccount from '@/components/EditAccount/EditAccount'
import { countdown } from '@/utils/countdown'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { createClient } from '@/utils/supabase/client'
import { useFetchStatusCount } from '@/hooks/useFetchStatusCount'
import Spinner from '@/components/Spinner'

type UserStatus = {
  status: 'DECLINED' | 'INVITED' | 'ACCEPTED'
}

const supabase = createClient()

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)
  const { event, statusCount, setStatusCount, filteredInviteData } =
    useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))
  const { data: statusData, error } = useFetchStatusCount(event?.id ?? '')

  const processStatusData = (data: UserStatus[]) => {
    const declined = data.filter(
      (status) => status.status === 'DECLINED'
    ).length
    const pending = data.filter((status) => status.status === 'INVITED').length
    const accepted = data.filter(
      (status) => status.status === 'ACCEPTED'
    ).length

    setStatusCount({ ...statusCount, declined, invited: pending, accepted })
  }

  const renderRsvpStatus = useCallback(
    (
      heading: string,
      status: 'error' | 'warning' | 'success',
      count: number,
      filterType: string
    ) => {
      const isDisabled =
        filteredInviteData.filter !== 'ALL' &&
        filteredInviteData.filter !== filterType

      return (
        <RsvpStatus
          heading={heading}
          status={status}
          count={count}
          disabled={isDisabled}
          clearFilter={{
            isShowing: filteredInviteData.filter === filterType,
          }}
        />
      )
    },
    [filteredInviteData.filter]
  )

  useEffect(() => {
    if (statusData) {
      processStatusData(statusData)
      setLoading(false)
    }
  }, [statusData])

  if (loading) return

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
        </div>

        {/* RSVP status buttons */}
        <div className="mb-20 mt-8 flex w-full items-center gap-20 pl-5">
          {renderRsvpStatus(
            'declined',
            'error',
            statusCount.declined,
            'DECLINED'
          )}
          {renderRsvpStatus(
            'pending',
            'warning',
            statusCount.invited,
            'INVITED'
          )}
          {renderRsvpStatus(
            'accepted',
            'success',
            statusCount.accepted,
            'ACCEPTED'
          )}
        </div>
        <Invites isCloseShowing={false} />
      </div>
    </div>
  )
}
