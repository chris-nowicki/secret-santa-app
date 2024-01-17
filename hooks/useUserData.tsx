'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@/types/types'

export const useUserData = () => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: '',
  })
  const supabase = createClient()

  const fetchUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data } = await supabase
        .from('profile')
        .select('*')
        .eq('id', session.user.id)

      if (data) {
        setUser((prevUser) => ({
          ...prevUser,
          id: session.user.id,
          name: data[0].name,
          email: data[0].email,
          avatar: data[0].avatar,
          role: data[0].role,
        }))
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return { user, setUser }
}
