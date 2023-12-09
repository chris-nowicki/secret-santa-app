import React, { useState } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { updateUser } from '@/actions/updateUser'
import ShowHidePassword from '../ShowHidePassword/ShowHidePassword'

export default function EditEvent() {
  const { user, setUser, aside, setAside } = useSecretSanta()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  return (
    <>
      {aside.myAccount && (
        <div className="ml-4 w-[661px]">
          <h1 className="-mb-12 font-condensed text-[116.89px] uppercase text-white">
            MY ACCOUNT
          </h1>
          <form
            action={async (formData) => {
              await updateUser(formData)

              setUser({
                ...user,
                name: userData.name,
                email: userData.email,
              })

              setAside({
                ...aside,
                show: false,
              })
            }}
            className="mt-16 flex w-[661px] flex-col gap-4"
          >
            <div className="relative">
              <input type="hidden" id="userId" name="eventId" value={user.id} />
              <span className="absolute left-8 top-[34px] font-handwriting text-3xl uppercase">
                name
              </span>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="customAccount"
              />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-8 top-[34px] font-handwriting text-3xl uppercase">
                email
              </span>
              <input
                type="email"
                name="email"
                placeholder=""
                value={userData.email}
                onChange={handleChange}
                className="customAccount"
              />
            </div>
            <ShowHidePassword custom={true} />
            <button type="submit" className="mt-6">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}
