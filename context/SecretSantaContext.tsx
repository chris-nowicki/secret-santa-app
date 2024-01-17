'use client'
import React, { useState, useContext, createContext } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { useEventDetails } from '@/hooks/useEventDetails'
import type { SecretSantaContextType } from '@/types/types'

import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

type SecretSantaProviderProps = {
  children: React.ReactNode
}

export const SecretSantaContext = createContext<SecretSantaContextType | null>(
  null
)

export const SecretSantaContextProvider = ({
  children,
}: SecretSantaProviderProps) => {
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [aside, setAside] = useState({
    show: false,
    myAccount: false,
    editEvent: false,
    viewWishList: false,
  })
  const [statusCount, setStatusCount] = useState({
    declined: 0,
    invited: 0,
    accepted: 0,
  })
  const [attendee, setAttendee] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  })
  const { user, setUser } = useUserData()
  const {
    event,
    setEvent,
    invites,
    setInvites,
    filteredInviteData,
    setFilteredInviteData,
  } = useEventDetails(user)

  const handleAside = async (menu: string) => {
    setAside({
      ...aside,
      show: !aside.show,
      myAccount: menu === 'myAccount' ? true : false,
      editEvent: menu === 'editEvent' ? true : false,
    })
  }

  const fetchAttendee = async (id: string) => {
    const { data } = await supabase.from('profile').select('*').eq('id', id)

    if (data) {
      setAttendee((prevAttendee) => ({
        ...prevAttendee,
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        role: data[0].role,
      }))
    }
  }

  return (
    <SecretSantaContext.Provider
      value={{
        user,
        setUser,
        attendee,
        setAttendee,
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
        fetchAttendee,
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
