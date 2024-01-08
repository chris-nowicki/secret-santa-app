import React from 'react'

export default function Checkbox({
  name,
  checked,
  onChange,
  className,
}: {
  name: string
  checked?: boolean
  onChange?: (e: any) => void
  className?: string
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
      <label htmlFor={name} className={className}>
        Send out a reminder for an event
      </label>
    </div>
  )
}
