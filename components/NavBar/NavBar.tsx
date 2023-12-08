'use client'
import { useEffect, useState } from 'react'
import Hamburger from '../Hamburger/Hamburger'
import MyAccount from '../MyAccount/MyAccount'
import { useSecretSanta } from '@/context/SecretSantaContext'

export default function NavBar() {
  const [loading, setLoading] = useState(true)
  const { user, setShowSideMenu } = useSecretSanta()

  const handleCLick = () => {
    setShowSideMenu((prevState) => !prevState)
  }

  useEffect(() => {
    user.id !== '' && setLoading(false)
  }, [user])

  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex w-full justify-between pr-12 pt-4">
        <Hamburger handleClick={handleCLick} />
        {!loading && <MyAccount name={user.name} />}
      </div>
    </>
  )
}
