'use client'
import { useEffect, useState } from 'react'
import Hamburger from '../UI/Hamburger'
import MyAccount from '../MyAccount/MyAccount'
import { useSecretSanta } from '@/context/SecretSantaContext'

export default function NavBar() {
  const [loading, setLoading] = useState(true)
  const { user, setShowSideMenu } = useSecretSanta()

  const handleCLick = () => {
    setShowSideMenu((prevState) => !prevState)
    document.body.classList.toggle('no-scroll')
  }

  useEffect(() => {
    user.id !== '' && setLoading(false)
  }, [user])

  return (
    <>
      <div className="absolute left-0 top-0 z-30 flex w-full justify-between pr-12 pt-4">
        <Hamburger handleClick={handleCLick} />
        {!loading && <MyAccount name={user.name} />}
      </div>
    </>
  )
}
