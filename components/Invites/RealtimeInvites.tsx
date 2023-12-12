'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import Card from '../Card/Card'
import { useRouter } from 'next/navigation'

export default function RealtimeInvites({
  invites,
  handleClose,
  isCloseShowing,
}: {
  invites: any
  handleClose: any
  isCloseShowing: any
}) {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime invites')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'userStatus',
        },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return (
    invites &&
    invites?.map((invite: any) => (
      <Card
        key={invite.id}
        avatar={{
          alt: 'Avatar',
          avatar: 'https://picsum.photos/seed/1701322447715/300/300',
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
