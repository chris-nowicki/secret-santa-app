'use server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export const updateEvent = async (formData: FormData) => {
  const supabase = createServerActionClient<Database>({ cookies })

  const id = formData.get('eventId')
  const name = formData.get('eventName')
  const date = formData.get('eventDate')
  const checked = formData.get('sendReminder')

  const { data, error } = await supabase
    .from('event')
    .update({
      name: name as string,
      date: date as string,
      sendReminder: checked === 'on',
      updatedAt: new Date().toISOString(),
    })
    .eq('id', id as string)
    .select()

  if (data && data.length > 0) {
    return
  }

  error && console.error(error)
}
