'use client'
import { useState } from 'react'
import Icon from '../Icon/Icon'

const ShowHidePassword = ({ name }: { name: string }) => {
  const [isPasswordShowing, setIsShowPasswordShowing] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPasswordShowing((prevValue) => !prevValue)
  }

  return (
    <div className="field relative">
      {isPasswordShowing ? (
        <input type="text" name="password" placeholder="Password" />
      ) : (
        <input type="password" name="password" placeholder="Password" />
      )}
      <button className="absolute right-6 top-8" onClick={toggleShowPassword}>
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
