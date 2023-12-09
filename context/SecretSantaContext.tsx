'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useContext, createContext, useEffect } from 'react'

type SecretSantaProviderProps = {
  children: React.ReactNode
}

type SecretSantaContextType = {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
  }
  setUser: React.Dispatch<React.SetStateAction<any>>
  showSideMenu: boolean
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>
  event: {
    id: string
    name: string
    date: string
    sendReminder: boolean
  }
  setEvent: React.Dispatch<React.SetStateAction<any>>
  aside: {
    show: boolean
    myAccount: boolean
    editEvent: boolean
  }
  setAside: React.Dispatch<React.SetStateAction<any>>
  handleAside: (menu: string) => void
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
  const supabase = createClientComponentClient()

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
      }}
    >
      {children}
    </SecretSantaContext.Provider>
  )
}

export const useSecretSanta = () => {
  const context = useContext(SecretSantaContext)
  if (context === null) {
    throw new Error(
      'useSecretSanta must be used within a SecretSantaProvider'
    )
  }
  return context
}
