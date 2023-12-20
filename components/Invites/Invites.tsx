import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import RealtimeInvites from './RealtimeInvites'
import { InviteType } from '@/types/context.types'

export default function Invites({ isCloseShowing = false }) {
  const supabase = createClient()
  const { event, setInvites } = useSecretSanta()

  const getInvites = async () => {
    const { data, error } = await supabase
      .from('userStatus')
      .select(`id, profile(id, name, email, avatar), email, name, status`)
      .eq('eventId', event.id)
    if (data) {
      setInvites(data as unknown as InviteType[])
    }
  }

  useEffect(() => {
    getInvites()
  }, [event])

  return (
    <div className="mb-20 grid grid-cols-2 gap-x-12 gap-y-8">
      <RealtimeInvites isCloseShowing={isCloseShowing} />
    </div>
  )
}
