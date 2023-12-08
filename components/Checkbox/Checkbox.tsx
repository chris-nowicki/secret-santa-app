import React from 'react'

export default function Checkbox({
  name,
  checked,
  onChange,
}: {
  name: string
  checked?: boolean
  onChange?: (e: any) => void
}) {
  return (
    <div>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>Send out a reminder for an event</label>
    </div>
  )
}
