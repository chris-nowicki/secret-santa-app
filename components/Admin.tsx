import React from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import Icon from './Icon'
import Button from './UI/Button'
import Link from 'next/link'

export default function Admin() {
  const { user, handleAside } = useSecretSanta()

  const handleClick = () => {
    console.log('clicked')
  }

  if (user.role !== 'ADMIN') return

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          handleAside('editEvent')
          document.body.classList.add('no-scroll')
        }}
      >
        <Icon id="pencil" size={24} />
      </button>
      <Button size="medium" handleClick={handleClick} className="bg-supernova">
        <Link href="/group/match">match</Link>
      </Button>
    </div>
  )
}
