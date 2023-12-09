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
  let eventId

  // create new event in event table
  const { data, error } = await supabase
    .from('event')
    .insert({
      name: name as string,
      date: date as string,
      sendReminder: checked === 'on',
    })
    .select()

  // update userStatus table with new event owner
  if (data && data.length > 0) {
    eventId = data[0].id

    await supabase.from('userStatus').insert({
      userId: userId as string,
      eventId: eventId as string,
      status: 'ACCEPTED',
    })
  } else {
    error && console.error(error)
  }

  // Update user role to ADMIN from profile table
  await supabase
    .from('profile')
    .update({
      role: 'ADMIN',
    })
    .eq('id', userId as string)

  return
}
