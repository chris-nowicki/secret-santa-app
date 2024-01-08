'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useFetchStatusCount } from '@/hooks/useFetchStatusCount'
import { countdown } from '@/utils/countdown'
import { processStatusData } from '@/utils/processStatusData'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/Aside/EditEvent/EditEvent'
import RsvpStatus from '@/components/RsvpStatus'
import EditAccount from '@/components/Aside/EditAccount/EditAccount'
import Loading from '@/components/UI/Spinner/LoadingSpinner'
import ViewWishList from '@/components/Aside/ViewWishList/ViewWishList'
import Admin from '@/components/Admin'
import Card from '@/components/UI/Card'
import EmptyCard from '@/components/UI/EmptyCard'

type UserStatus = {
  status: 'DECLINED' | 'INVITED' | 'ACCEPTED'
}

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)
  const {
    user,
    event,
    statusCount,
    setStatusCount,
    filteredInviteData,
    invites,
  } = useSecretSanta()
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
    console.log('statusData', statusData)
    if (statusData) {
      const updatedStatusCount = processStatusData(statusData as UserStatus[])
      setStatusCount({ ...statusCount, ...updatedStatusCount })
      setLoading(false)
    }
  }, [statusData])

  useEffect(() => {
    if (statusCount.invited === 0) {
      console.log('everyone has RSVPd')
    }
  }, [statusCount])

  if (user.role !== 'ADMIN') return
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
          <Admin />
        </div>
        {/* sort through for accepted invites */}
        <div className="mb-20 flex max-w-[1440px] flex-wrap items-center gap-4">
          {invites
            .filter((invite) => invite.status === 'ACCEPTED')
            .map(
              (invite, index) =>
                invite.status === 'ACCEPTED' && (
                  <>
                    <div key={index} className="flex w-[416px]">
                      <Card
                        key={invite.id}
                        avatar={{
                          alt: 'Avatar',
                          avatar: invite ? invite.profile.avatar : '',
                          letter: invite
                            ? invite.profile.name[0].substring(0, 1)
                            : '',
                          showSantaHat: index <= 2 ? true : false,
                        }}
                        // @ts-ignore
                        email={invite ? invite.profile.email : ''}
                        // @ts-ignore
                        name={invite ? invite.profile.name : ''}
                        isCloseShowing={false}
                      />
                    </div>
                    <div className="h-2.5 w-[44px] bg-supernova"></div>
                    <div className="w-[416px]">
                      <EmptyCard />
                    </div>
                  </>
                )
            )}
        </div>
      </div>
    </div>
  )
}
