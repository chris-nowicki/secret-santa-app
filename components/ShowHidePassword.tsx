'use client'
import { useState } from 'react'
import Icon from './Icon'
import clsx from 'clsx'

const ShowHidePassword = ({
  name,
  custom = false,
  tabIndex,
}: {
  name?: string
  custom?: boolean
  tabIndex?: number
}) => {
  const [isPasswordShowing, setIsShowPasswordShowing] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPasswordShowing((prevValue) => !prevValue)
  }

  return (
    <div className="field">
      <span
        className={clsx(
          custom
            ? 'absolute left-8 top-[34px] font-handwriting text-3xl uppercase'
            : 'hidden'
        )}
      >
        password
      </span>
      {isPasswordShowing ? (
        <input
          type="text"
          name="password"
          placeholder={custom ? '' : 'Password'}
          tabIndex={tabIndex}
          className={clsx(custom ? 'customAccount' : '')}
        />
      ) : (
        <input
          type="password"
          name="password"
          placeholder={custom ? '' : 'Password'}
          tabIndex={tabIndex}
          className={clsx(custom ? 'customAccount' : '')}
        />
      )}
      <button
        type="button"
        className="absolute right-6 top-8"
        onClick={() => setIsShowPasswordShowing((prevValue) => !prevValue)}
        tabIndex={-1}
      >
        {!isPasswordShowing ? (
          <Icon id="eyeClosed" size={32} />
        ) : (
          <Icon id="eyeOpened" size={32} />
        )}
      </button>
    </div>
  )
}

export default ShowHidePassword
