'use server'
import * as React from 'react'
import { Resend } from 'resend'
import { format } from 'date-fns/format'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmailInvite = async (
  email: string,
  subject: string,
  name: string,
  link: string,
  author: string,
  eventName: string,
  eventDate: string,
  template: JSX.Element
) => {
  if (
    name === undefined ||
    link === undefined ||
    email === undefined ||
    author === undefined ||
    eventName === undefined ||
    eventDate === undefined ||
    template === undefined
  ) {
    throw new Error('Name or link is undefined')
  }

  let data

  try {
    data = await resend.emails.send({
      from: 'Secret Santa App <secretsanta@chrisnowicki.io>',
      to: 'chris@chrisnowicki.io',
      subject: subject,
      react: React.createElement(template, {
        name: name,
        link: link,
        eventName: eventName,
        eventDate: format(new Date(eventDate), 'EEEE MMMM do, yyyy'),
        author: author,
      }),
    })
  } catch (error: unknown) {
    return {
      error: error,
    }
  }

  return {
    data,
  }
}
