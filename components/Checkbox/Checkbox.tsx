import React from 'react'

export default function Checkbox({ name }: { name: string }) {
  return (
    <div>
      <input type="checkbox" name={name} id={name} />
      <label htmlFor={name}>Send out a reminder for an event</label>
    </div>
  )
}
