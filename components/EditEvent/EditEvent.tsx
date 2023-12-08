import React, { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { useSecretSanta } from '@/context/SecretSantaContext'
import format from 'date-fns/format'
import { updateEvent } from '@/actions/updateEvent'

export default function EditEvent() {
  const { event, setEvent, setAside } = useSecretSanta()
  const [eventData, setEventData] = useState({
    eventName: event.name,
    eventDate: format(new Date(event.date), 'yyyy-MM-dd'),
    sendReminder: event.sendReminder,
  })

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className="ml-4 w-[661px]">
      <h1 className="-mb-12 font-condensed text-[116.89px] uppercase text-white">
        EVENT DETAILS
      </h1>
      <span className="font-handwriting text-[31.57px] text-white">
        EDIT THE CURRENT EVENT
      </span>
      <form
        action={async (formData) => {
          await updateEvent(formData)

          setEvent({
            ...event,
            name: eventData.eventName,
            date: eventData.eventDate,
            sendReminder: eventData.sendReminder,
          })

          setAside(false)
        }}
      >
        <div className="field mt-6 w-[661px] flex-1">
          <input type="hidden" id="eventId" name="eventId" value={event.id} />
          <label htmlFor="eventName">Name</label>
          <input
            type="text"
            name="eventName"
            id="eventName"
            className="input"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </div>
        <div className="field w-[661px] flex-1">
          <label htmlFor="email">Date</label>
          <input
            type="date"
            name="eventDate"
            id="eventDate"
            placeholder=""
            value={eventData.eventDate}
            onChange={handleChange}
          />
        </div>
        <Checkbox
          name="sendReminder"
          checked={eventData.sendReminder}
          onChange={handleChange}
        />
        <button type="submit" className="mt-6">
          Submit
        </button>
      </form>
    </div>
  )
}
