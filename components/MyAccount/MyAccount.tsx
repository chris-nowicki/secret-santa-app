import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSecretSanta } from '@/context/SecretSantaContext'
import Avatar from '../Avatar/Avatar'
import Icon from '../Icon/Icon'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const MyAccount = ({ name }: { name: string | null }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { handleAside } = useSecretSanta()

  const toggleDropdown = () => {
    setIsDropdownShowing((prevValue) => !prevValue)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="relative mr-6 dark:text-white">
      <button className="flex items-center gap-2" onClick={toggleDropdown}>
        <motion.div animate={{ rotate: isDropdownShowing ? 180 : 0 }}>
          <Icon id="chevron" />
        </motion.div>
        <Avatar
          avatar="https://picsum.photos/seed/1701239203355/300/300"
          alt="Amy"
        />
        <div className="text-left">
          <div className="text-sm">Logged in as</div>
          <div className="text-lg">
            <strong>{name}</strong>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isDropdownShowing && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dropdown z-10 inline-block bg-white py-5 pl-4 pr-5"
          >
            <ul className="flex flex-col gap-2">
              <li>
                <div className="text-pastelMagenta">
                  <Icon size={32} id="user" />
                </div>
                <button
                  onClick={() => {
                    handleAside('myAccount')
                    toggleDropdown()
                  }}
                >
                  My Account
                </button>
              </li>
              <li>
                <div className="text-pastelMagenta">
                  <Icon size={32} id="calendar" />
                </div>
                My Event
              </li>
              <li>
                <div className="text-pastelMagenta">
                  <Icon size={32} id="logout" />
                </div>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MyAccount
