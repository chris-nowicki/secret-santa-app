'use client'
import { createClient } from '@/utils/supabase/client'
import React, { useState, useContext, createContext, useEffect } from 'react'
import type {
  SecretSantaContextType,
  InviteType,
  FilteredDataInviteType,
} from '@/types/context.types'
import { QueryData } from '@supabase/supabase-js'

type SecretSantaProviderProps = {
  children: React.ReactNode
}

export const SecretSantaContext = createContext<SecretSantaContextType | null>(
  null
)

export const SecretSantaContextProvider = ({
  children,
}: SecretSantaProviderProps) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  })
  const [event, setEvent] = useState({
    id: '',
    name: '',
    date: '',
    sendReminder: false,
  })
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [invites, setInvites] = useState<InviteType[]>([])
  const [filteredInviteData, setFilteredInviteData] =
    useState<FilteredDataInviteType>({
      data: [],
      filter: 'ALL',
    })
  const [aside, setAside] = useState({
    show: false,
    myAccount: false,
    editEvent: false,
  })
  const [statusCount, setStatusCount] = useState({
    declined: 0,
    invited: 0,
    accepted: 0,
  })
  const supabase = createClient()

  const handleAside = async (menu: string) => {
    setAside({
      ...aside,
      show: !aside.show,
      myAccount: menu === 'myAccount' ? true : false,
      editEvent: menu === 'editEvent' ? true : false,
    })
  }

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

  const getEvent = async () => {
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
    fetchUser()
  }, [])

  useEffect(() => {
    if (user && user.id !== '') {
      getEvent()
    }
  }, [user])

  useEffect(() => {
    if (event && event.id !== '') {
      const fetchInvites = async () => {
        const { data } = await supabase
          .from('invite')
          .select('*')
          .eq('eventId', event.id)

        if (data) {
          setInvites(data)
        }
      }

      fetchInvites()
    }
  }, [event])

  useEffect(() => {
    setFilteredInviteData({
      ...filteredInviteData,
      data: renderFilteredInviteData() as never[],
    })
  }, [invites])

  return (
    <SecretSantaContext.Provider
      value={{
        user,
        setUser,
        showSideMenu,
        setShowSideMenu,
        event,
        setEvent,
        aside,
        setAside,
        handleAside,
        invites,
        setInvites,
        statusCount,
        setStatusCount,
        filteredInviteData,
        setFilteredInviteData,
      }}
    >
      {children}
    </SecretSantaContext.Provider>
  )
}

export const useSecretSanta = () => {
  const context = useContext(SecretSantaContext)
  if (context === null) {
    throw new Error('useSecretSanta must be used within a SecretSantaProvider')
  }
  return context
}
