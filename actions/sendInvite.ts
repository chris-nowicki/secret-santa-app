'use server'
import { createClient } from '@supabase/supabase-js'

export const sendInvite = async (formData: FormData) => {
  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabase_url === undefined || service_role_key === undefined) {
    throw new Error('Supabase url or service role key is undefined')
  }

  // Access anon client supabase api
  const supabase = createClient(supabase_url, service_role_key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  // Access auth admin api
  const adminAuthClient = supabase.auth.admin

  // Get form data
  const name = formData.get('name')
  const email = formData.get('email')
  const eventId = formData.get('eventId')

  // generate invite link
  const { data, error } = await adminAuthClient.generateLink({
    type: 'invite',
    email: email as string,
    options: {
      data: {
        name: name as string,
        eventId: eventId as string,
      },
    },
  })

  if (data && data.user) {
    // Send email using resend
    console.log(data)
    return {
      userId: data.user.id,
      eventId: eventId,
      status: 'INVITED',
      name: name,
      email: email,
    }
  }

  console.log(error)
}
