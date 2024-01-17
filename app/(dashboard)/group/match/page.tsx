'use client'
import { useEffect, useState } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { countdown } from '@/utils/countdown'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/Aside/EditEvent/EditEvent'
import EditAccount from '@/components/Aside/EditAccount/EditAccount'
import Loading from '@/components/UI/Spinner/LoadingSpinner'
import ViewWishList from '@/components/Aside/ViewWishList/ViewWishList'
import Admin from '@/components/Admin'
import { matchUsers } from '@/actions/matchUsers'

export default function GroupDashboard() {
  const [loading, setLoading] = useState(true)
  const { event } = useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))

  useEffect(() => {
    if (event && event.id === '') {
      return
    }

    async function match() {
      await matchUsers(event.id)
      setLoading(false)
    }

    match()
  }, [])

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

        {/* Secret Santa Matches */}
        <div className="mb-20 mt-8 flex w-full items-center gap-20 pl-5"></div>
      </div>
    </div>
  )
}
