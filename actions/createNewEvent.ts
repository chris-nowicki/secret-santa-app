'use server'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export const createNewEvent = async (formData: FormData) => {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const name = formData.get('eventName')
  const date = formData.get('eventDate')
  const checked = formData.get('sendReminder')
  const userId = session?.user.id

  const { data, error } = await supabase
    .from('event')
    .insert({
      name: name as string,
      date: date as string,
      sendReminder: checked === 'on',
    })
    .select('*')

  if (data) {
    await supabase.from('userStatus').insert({
      userId: userId as string,
      eventId: data[0].id as string,
      status: 'ACCEPTED',
    })

    await supabase
      .from('profile')
      .update({
        role: 'ADMIN',
      })
      .eq('userId', userId as string)

    return {
      id: data[0].id,
      name: data[0].name,
      date: data[0].date,
    }
  }

  error && console.error(error)
}
