import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import RealtimeInvites from './RealtimeInvites'

export default function Invites({ isCloseShowing = false }) {
  const supabase = createClient()
  const { event, setInvites } = useSecretSanta()

  const getInvites = async () => {
    const { data, error } = await supabase
      .from('userStatus')
      .select(`id, profile(id, name, email, avatar), email, name, status`)
      .eq('eventId', event.id)
    setInvites(data)
  }

  const handleClose = async (id?: number) => {
    await supabase.from('userStatus').delete().eq('id', id)
  }

  useEffect(() => {
    getInvites()
  }, [event])

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-20">
      <RealtimeInvites
        isCloseShowing={isCloseShowing}
        handleClose={handleClose}
      />
    </div>
  )
}
