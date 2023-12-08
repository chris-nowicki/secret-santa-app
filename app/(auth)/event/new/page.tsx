'use client'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'
import Checkbox from '@/components/Checkbox/Checkbox'
import { createNewEvent } from '@/actions/createNewEvent'
import { redirect } from 'next/navigation'

export default function NewEvent() {
  return (
    <div className="flex w-full flex-col">
      <HeaderWithRulers className="mb-8 text-white" heading="NEW GROUP" />
      <form
        action={async (formData) => {
          await createNewEvent(formData)
          redirect('/group/invite')
        }}
        className="flex flex-col gap-4"
      >
        <input type="text" name="eventName" placeholder="Event Name" />
        <input type="date" name="eventDate" placeholder="Event Date" />
        <Checkbox name="sendReminder" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
