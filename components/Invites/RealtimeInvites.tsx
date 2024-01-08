'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useSecretSanta } from '@/context/SecretSantaContext'
import Card from '../UI/Card'
import { InviteType } from '@/types/context.types'
import { usePathname } from 'next/navigation'

type RealtimeInvitesProps = {
  isCloseShowing: boolean
}

const supabase = createClient()

export default function RealtimeInvites({
  isCloseShowing,
}: RealtimeInvitesProps) {
  const {
    invites,
    setInvites,
    setStatusCount,
    filteredInviteData,
    aside,
    setAside,
    fetchAttendee,
  } = useSecretSanta()
  const pathname = usePathname()

  const handleClose = async (id?: number) => {
    await supabase.from('userStatus').delete().eq('id', id)
  }

  const statusInviteCountHelper = (data: any) => {
    const declined = data.filter((data: any) => data.status === 'DECLINED')
    const invited = data.filter((data: any) => data.status === 'INVITED')
    const accepted = data.filter((data: any) => data.status === 'ACCEPTED')

    setStatusCount({
      declined: declined.length,
      invited: invited.length,
      accepted: accepted.length,
    })
  }

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'userStatus' },
        (payload) => {
          if (payload && payload.eventType === 'DELETE') {
            // filter out removed invites
            const updatedInvites = invites.filter(
              (invite: any) => invite.id !== payload.old.id
            )

            // update list of invites
            setInvites([...updatedInvites])

            // update status count for dashboard
            statusInviteCountHelper(updatedInvites)
          } else if (payload && payload.eventType === 'UPDATE') {
            // find the existing invite
            const existingInviteIndex = invites.findIndex(
              (invite) => invite.id === payload.new.id
            )

            // if invite exists, replace it
            if (existingInviteIndex > -1) {
              // replace existing invite
              invites[existingInviteIndex] = payload.new as InviteType

              // update lit of invites
              setInvites([...invites])

              // update status count for dashboard
              statusInviteCountHelper(invites)
            }
          } else {
            // add new invite
            const newInvites = [...invites, payload.new]

            // update list of invites
            setInvites(newInvites as InviteType[])

            // update status count for dashboard
            statusInviteCountHelper(newInvites)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setInvites, invites])

  return (
    filteredInviteData &&
    filteredInviteData.data.map((invite: any) => (
      <div className="relative flex">
        {pathname !== '/group/invite' && (
          <button
            className="absolute left-0 top-0 z-20 h-full w-full"
            onClick={() => {
              fetchAttendee(invite.profile.id)
              setTimeout(() => {
                setAside({
                  ...aside,
                  show: true,
                  viewWishList: true,
                  editEvent: false,
                  myAccount: false,
                })
              }, 90)
            }}
          />
        )}
        <Card
          key={invite.id}
          avatar={{
            alt: 'Avatar',
            avatar: invite.profile ? invite.profile.avatar : '',
            letter: invite.profile
              ? invite.profile.name[0].substring(0, 1)
              : invite.name[0].substring(0, 1),
            indicator: invite.status,
            showSantaHat: false,
          }}
          // @ts-ignore
          email={invite.profile ? invite.profile.email : invite.email}
          // @ts-ignore
          name={invite.profile ? invite.profile.name : invite.name}
          handleClose={() => handleClose(invite.id)}
          isCloseShowing={isCloseShowing}
        />
      </div>
    ))
  )
}
