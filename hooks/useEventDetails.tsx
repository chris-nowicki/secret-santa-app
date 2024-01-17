import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type {
  EventType,
  FilteredDataInviteType,
  InviteType,
  User,
} from '@/types/types'
import { QueryData } from '@supabase/supabase-js'

export const useEventDetails = (user: User) => {
  const [event, setEvent] = useState<EventType>({
    id: '',
    name: '',
    date: '',
    sendReminder: false,
  })
  const [filteredInviteData, setFilteredInviteData] =
    useState<FilteredDataInviteType>({
      data: [],
      filter: 'ALL',
    })
  const [invites, setInvites] = useState<InviteType[]>([])
  const supabase = createClient()

  const fetchEvent = async () => {
    const userStatus = supabase
      .from('userStatus')
      .select(`id, status, event(id, name, date, sendReminder)`)
      .eq('userId', user?.id)

    type userStatus = QueryData<typeof userStatus>

    const { data } = await userStatus

    if (data && data[0].event) {
      const event = data[0].event

      setEvent({
        // @ts-ignore
        id: event.id,
        // @ts-ignore
        name: event.name,
        // @ts-ignore
        date: event.date,
        // @ts-ignore
        sendReminder: event.sendReminder,
      })
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [user.id])

  useEffect(() => {
    if (event && event.id !== '') {
      const fetchInvites = async () => {
        const { data } = await supabase
          .from('userStatus')
          .select('id, status, profile(id, name, email, avatar, role)')
          .eq('eventId', event.id)

        if (data) {
          setInvites(invites)
        }
      }

      fetchInvites()
    }
  }, [event])

  const renderFilteredInviteData = () => {
    if (filteredInviteData.filter === 'ALL') {
      return invites as never[]
    }

    if (filteredInviteData.filter === 'ACCEPTED') {
      return invites.filter((invite) => invite.status === 'ACCEPTED')
    }

    if (filteredInviteData.filter === 'DECLINED') {
      return invites.filter((invite) => invite.status === 'DECLINED')
    }

    return invites.filter((invite) => invite.status === 'INVITED')
  }

  useEffect(() => {
    setFilteredInviteData({
      ...filteredInviteData,
      data: renderFilteredInviteData() as never[],
    })
  }, [invites])

  return {
    event,
    setEvent,
    invites,
    setInvites,
    filteredInviteData,
    setFilteredInviteData,
  }
}
