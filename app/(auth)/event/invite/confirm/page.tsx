'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import HeaderWithRulers from '@/components/HeaderWithRulers'
import RsvpButton from '@/components/UI/RsvpButton'
import { format } from 'date-fns/format'
import { useRouter } from 'next/navigation'

type PageDataType = {
  user: {
    statusId: string
    id: string
  }
  event: {
    id: string
    name: string
    date: string
  }
}

export default function NewEvent() {
  const [loaded, setLoaded] = useState(false)
  const [pageData, setPageData] = useState<PageDataType>({
    user: {
      statusId: '',
      id: '',
    },
    event: {
      id: '',
      name: '',
      date: '',
    },
  })
  const supabase = createClient()
  const router = useRouter()

  const getEventData = async () => {
    const userData = await supabase.auth.getUser()
    const user = userData.data.user

    if (user) {
      const { data } = await supabase
        .from('userStatus')
        .select(`id, status, event(id, name, date, sendReminder)`)
        .eq('userId', user.id)

      if (user && data) {
        setPageData({
          user: {
            statusId: data[0].id,
            id: user.id,
          },
          event: {
            // @ts-ignore
            id: data[0].event.id,
            // @ts-ignore
            name: data[0].event.name,
            // @ts-ignore
            date: data[0].event.date,
          },
        })
      }
    }
  }

  const handleButton = async (action: 'DECLINED' | 'ACCEPTED') => {
    await supabase
      .from('userStatus')
      .update({ status: action })
      .eq('id', pageData.user.statusId)

    if (action === 'DECLINED') {
      router.push('/event/invite/declined')
    } else {
      router.push('/event/invite/accept')
    }
  }

  useEffect(() => {
    getEventData()
  }, [])

  useEffect(() => {
    if (pageData && pageData.user.id !== '') {
      setLoaded(true)
    }
  }, [pageData])

  return (
    <div className="flex w-full flex-col items-center">
      <HeaderWithRulers
        className="-mb-1 text-white"
        heading="YOU'RE INVITED TO"
      />
      {loaded && (
        <>
          <h1 className="text-center font-condensed text-8xl uppercase text-white">
            {pageData.event.name}
          </h1>
          <span className="font-handwriting text-4xl uppercase text-white">
            {format(new Date(pageData.event.date), 'LLLL do, Y')}
          </span>

          <div className="space-between mt-12 flex items-center gap-6">
            <RsvpButton
              icon="thumbsDown"
              handleButton={() => handleButton('DECLINED')}
              heading="Regretfully Decline"
              className="bg-orangeRed"
            />
            <RsvpButton
              icon="thumbsUp"
              handleButton={() => handleButton('ACCEPTED')}
              heading={`I'll Be There!`}
              className="bg-spanishGreen"
            />
          </div>
        </>
      )}
    </div>
  )
}
