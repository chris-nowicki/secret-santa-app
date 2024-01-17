import { InviteType } from '@/types/types'
import { createClient } from './client'

const supabase = createClient()

export const getInvites = async (eventId: string) => {
  if (!eventId) return

  const { data, error } = await supabase
    .from('userStatus')
    .select(`id, profile(id, name, email, avatar), email, name, status`)
    .eq('eventId', eventId)
  if (data) {
    return data as unknown as InviteType[]
  }
}
