import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { useSecretSanta } from '@/context/SecretSantaContext'

type Invite = {
  id: number
  profile?: {
    id: string
    name: string
    email: string
    avatar: string
  }[]
  email: string
  name: string
}

export default function Invites({ isCloseShowing = false }) {
  const supabase = createClientComponentClient()
  const { event } = useSecretSanta()
  const [invites, setInvites] = useState<Invite[] | null>([])

  const getInvites = async () => {
    const { data, error } = await supabase
      .from('userStatus')
      .select(`id, profile(id, name, email, avatar), email, name`)
      .eq('eventId', event.id)
    setInvites(data)
    console.log('we get here')
    console.log(data)
  }

  const handleClose = async (id?: number) => {
    const { data, error } = await supabase
      .from('userStatus')
      .delete()
      .eq('id', id)

    const newInvites = invites?.filter((invite) => invite.id !== id)
    setInvites(newInvites ? newInvites : [])
  }

  useEffect(() => {
    getInvites()
  }, [event])

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
      {invites &&
        invites.map((invite) => (
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
        ))}
    </div>
  )
}
