'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../Icon'

type Props = {
  children: React.ReactNode
  defaultIsShowing?: boolean
  heading?: string
}

const Accordion = ({ children, defaultIsShowing = false, heading }: Props) => {
  const [isShowing, setIsShowing] = useState(defaultIsShowing)

  const toggleShowing = () => {
    setIsShowing((preValue) => !preValue)
  }

  return (
    <div>
      <button
        className="flex w-full items-center gap-3 font-handwriting uppercase tracking-tighter"
        onClick={toggleShowing}
      >
        {heading}
        <div className="w-full flex-1 border-t-1 border-t-black" />
        <motion.div animate={{ rotate: isShowing ? -180 : 0 }}>
          <Icon id="chevron" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='relative'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
