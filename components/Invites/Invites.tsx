import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { useSecretSanta } from '@/context/SecretSantaContext'

export default function Invites({ isCloseShowing = false }) {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const { event, invites, setInvites } = useSecretSanta()

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
    setInvites(newInvites)
  }

  useEffect(() => {
    getInvites()
  }, [event])

  useEffect(() => {
    if (invites && invites.length > 0) {
      setLoading(false)
    }
  }, [invites])

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
            email={invite.profile ? invite.profile.email : invite.email}
            name={invite.profile ? invite.profile.name : invite.name}
            handleClose={() => handleClose(invite.id)}
            isCloseShowing={isCloseShowing}
          />
        ))}
    </div>
  )
}
