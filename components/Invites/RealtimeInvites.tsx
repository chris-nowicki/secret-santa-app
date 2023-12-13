'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Card from '../Card/Card'
import { useSecretSanta } from '@/context/SecretSantaContext'

export default function RealtimeInvites({
  handleClose,
  isCloseShowing,
}: {
  handleClose: any
  isCloseShowing: any
}) {
  const { invites, setInvites, setStatusCount } = useSecretSanta()
  const supabase = createClient()

  const statusInviteCountHelper = (data: any) => {
    const declined = data.filter((data: any) => data.status === 'DECLINED')
    const invited = data.filter((data: any) => data.status === 'INVITED')
    const accepted = data.filter((data: any) => data.status === 'ACCEPTED')

    return { declined, invited, accepted }
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
            setInvites([...updatedInvites])
            const newStatusCount = statusInviteCountHelper(updatedInvites)
            setStatusCount({
              declined: newStatusCount.declined.length,
              invited: newStatusCount.invited.length,
              accepted: newStatusCount.accepted.length,
            })
          } else if (payload && payload.eventType === 'UPDATE') {
            const existingInviteIndex = invites.findIndex(
              (invite) => invite.id === payload.new.id
            )

            if (existingInviteIndex > -1) {
              // replace existing invite
              invites[existingInviteIndex] = payload.new
              setInvites([...invites])
              const newStatusCount = statusInviteCountHelper(invites)
              setStatusCount({
                declined: newStatusCount.declined.length,
                invited: newStatusCount.invited.length,
                accepted: newStatusCount.accepted.length,
              })
            }
          } else {
            const newInvites = [...invites, payload.new]
            setInvites(newInvites)
            const newStatusCount = statusInviteCountHelper(newInvites)
            setStatusCount({
              declined: newStatusCount.declined.length,
              invited: newStatusCount.invited.length,
              accepted: newStatusCount.accepted.length,
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setInvites, invites, setStatusCount])

  return (
    invites &&
    invites?.map((invite: any) => (
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
    ))
  )
}
