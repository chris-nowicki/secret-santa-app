import React, { useState } from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { useSecretSanta } from '@/context/SecretSantaContext'
import format from 'date-fns/format'
import { updateEvent } from '@/actions/updateEvent'

export default function EditEvent() {
  const { event, setEvent, setAside, aside } = useSecretSanta()
  const [eventData, setEventData] = useState({
    eventName: event.name,
    eventDate: format(new Date(event.date), 'yyyy-MM-dd'),
    sendReminder: event.sendReminder,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <>
      {aside.editEvent && (
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
            className="mt-8 flex w-[661px] flex-col gap-4"
          >
            <div className="relative">
              <input
                type="hidden"
                id="eventId"
                name="eventId"
                value={event.id}
              />
              <span className="absolute left-8 top-[34px] font-handwriting text-3xl uppercase">
                event name
              </span>
              <input
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
                className="customEvent"
              />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-8 top-[34px] font-handwriting text-3xl uppercase">
                event date
              </span>
              <input
                type="date"
                name="eventDate"
                id="eventDate"
                placeholder=""
                value={eventData.eventDate}
                onChange={handleChange}
                className="customEvent"
              />
            </div>
            <Checkbox
              name="sendReminder"
              checked={eventData.sendReminder}
              onChange={handleChange}
              className="text-white"
            />
            <button type="submit" className="mt-6">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  )
}
