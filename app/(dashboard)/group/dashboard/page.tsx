'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useFetchStatusCount } from '@/hooks/useFetchStatusCount'
import { countdown } from '@/utils/countdown'
import { processStatusData } from '@/utils/processStatusData'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/Aside/EditEvent/EditEvent'
import RsvpStatus from '@/components/RsvpStatus/RsvpStatus'
import Invites from '@/components/Invites/Invites'
import EditAccount from '@/components/Aside/EditAccount/EditAccount'
import Loading from '@/components/Spinner/LoadingSpinner'
import ViewWishList from '@/components/Aside/ViewWishList/ViewWishList'

type UserStatus = {
  status: 'DECLINED' | 'INVITED' | 'ACCEPTED'
}

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)
  const { event, statusCount, setStatusCount, filteredInviteData } =
    useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))
  const { data: statusData, error } = useFetchStatusCount(event?.id ?? '')

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
      const updatedStatusCount = processStatusData(statusData as UserStatus[])
      setStatusCount({ ...statusCount, ...updatedStatusCount })
      setLoading(false)
    }
  }, [statusData])

  if (loading) return <Loading />

  return (
    <div className="mt-[90px] flex w-full">
      <Aside>
        <EditEvent />
        <EditAccount />
        <ViewWishList />
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
