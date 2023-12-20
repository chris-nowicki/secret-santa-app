import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type UserStatus = {
  status: 'DECLINED' | 'INVITED' | 'ACCEPTED'
}

const supabase = createClient()

export const useFetchStatusCount = (eventId: string) => {
  const [data, setData] = useState<UserStatus[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) return

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('userStatus')
          .select('status')
          .eq('eventId', eventId)

        if (error) throw error
        setData(data)
      } catch (error) {
        console.error(error)
        setError('Failed to fetch status count')
      }
    }

    fetchData()
  }, [eventId])

  return { data, error }
}
