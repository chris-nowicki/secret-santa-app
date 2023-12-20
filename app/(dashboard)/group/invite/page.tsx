'use client'
import { useEffect, useState } from 'react'
import { countdown } from '@/utils/countdown'
import { useSecretSanta } from '@/context/SecretSantaContext'
import InviteGroup from '@/components/InviteGroup/InviteGroup'
import Icon from '@/components/Icon/Icon'
import Button from '@/components/Button/Button'
import Aside from '@/components/Aside/Aside'
import EditEvent from '@/components/EditEvent/EditEvent'
import EditAccount from '@/components/EditAccount/EditAccount'
import Loading from '@/components/Spinner/LoadingSpinner'

export default function GroupInvite() {
  const [loading, setLoading] = useState(true)
  const { event, handleAside } = useSecretSanta()
  const { weeks, days } = countdown(new Date(event?.date))

  const handleClick = async () => {
    console.log('clicked')
  }

  useEffect(() => {
    if (event.id !== '') {
      setLoading(false)
    }
  }, [event])

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
          <div className="flex items-center gap-2">
            <button onClick={() => handleAside('editEvent')}>
              <Icon id="pencil" size={24} />
            </button>
            <Button
              size="medium"
              handleClick={handleClick}
              className="bg-supernova"
            >
              match
            </Button>
          </div>
        </div>
        <InviteGroup />
      </div>
    </div>
  )
}
