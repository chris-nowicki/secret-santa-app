'use server'
import * as React from 'react'
import { Resend } from 'resend'
import EmailTemplate from '@/emails/email-template'
import format from 'date-fns/format'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  email: string,
  name: string,
  link: string,
  author: string,
  eventName: string,
  eventDate: string
) => {
  if (
    name === undefined ||
    link === undefined ||
    email === undefined ||
    author === undefined ||
    eventName === undefined ||
    eventDate === undefined
  ) {
    throw new Error('Name or link is undefined')
  }

  let data

  try {
    data = await resend.emails.send({
      from: 'Secret Santa App <secretsanta@chrisnowicki.io>',
      to: 'chris@chrisnowicki.io',
      subject: `Jingle all the way! You're invited to a Secret Santa Celebration`,
      react: React.createElement(EmailTemplate, {
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
