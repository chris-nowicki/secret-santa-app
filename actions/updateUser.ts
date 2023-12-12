'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export const updateUser = async (formData: FormData) => {
  const supabase = createClient(cookies())
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  const { data, error } = await supabase.auth.updateUser({
    email: email as string,
    data: {
      name: name,
    },
  })

  if (data) {
    console.log(data)
    return
  }

  error && console.error(error)
}
