'use client'
import { createClient } from '@/utils/supabase/client'
import React, { useState, useContext, createContext, useEffect } from 'react'
import type { SecretSantaContextType } from '@/types/context.types'

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
    avatar: '',
    role: '',
  })
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [event, setEvent] = useState({
    id: '',
    name: '',
    date: '',
    sendReminder: false,
  })
  const [aside, setAside] = useState({
    show: false,
    myAccount: false,
    editEvent: false,
  })
  const [invites, setInvites] = useState([]) as any[]
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

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data } = await supabase
        .from('profile')
        .select('*')
        .eq('id', session.user.id)

      if (data) {
        setUser({
          id: session.user.id,
          name: data[0].name,
          email: data[0].email,
          avatar: data[0].avatar,
          role: data[0].role,
        })
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

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
