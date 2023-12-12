import {
  Html,
  Head,
  Preview,
  Body,
  Text,
  Link,
  Img,
} from '@react-email/components'
import { Tailwind } from '@react-email/components'

interface EmailTemplateProps {
  name: string
  link: string
  eventName: string
  eventDate: string
  author: string
}

export default function EmailTemplate(props: EmailTemplateProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>You're invited to a Secret Santa Celebration!</Preview>
      <Tailwind>
        <Body className=" bg-white text-black">
            <Img
            src="http://localhost:3000/images/bg-email.png"
            alt="Secret Santa"
            width={800}
            className="absolute left-0 top-0 -z-10"
          />
          <div className='w-[425px] mt-[225px] pl-60'>
            <Text className="font-sans ">Hey {props.name}!</Text>
            <Text className="font-sans">
              I hope this email sleighs you with joy! `Tis the season to be
              merry, and we are putting together an epic Secret Santa
              Extravaganza. You, my friend, are cordially invited to join the
              festive fun!
            </Text>
            <Text className="font-sans">
              Hold onto your stockings because here are the deets:
            </Text>
            <Text className="font-sans">🎅 {props.eventName}</Text>
            <Text className="font-sans">📆 {props.eventDate}</Text>
            <Text className="font-sans">
              Let's get down to business - Secret Santa style! In case you're
              not familiar with this holly jolly tradition, here's the scoop:
              each person will be handed a name out of Santa's mystical hat and
              become their very own gift-giver extraordinaire. You'll surprise
              them with a present that will make their heart sing Christmas
              carols!
            </Text>
            <Text className="font-sans">
              To secure your spot among Santa's little helpers, please RSVP
              clicking on this link:
            </Text>
            <Link href={props.link}>{props.link}</Link>
            <Text className="font-sans">
              If you're able to come, you'll receive access to fill out your own
              wish list with gift ideas that would make you say, "Oh, deer, it's
              perfect!" Once everyone has completed their lists, we'll send out
              a second email revealing who you'll be hunting down the perfect
              present for.
            </Text>
            <Text className="font-sans">
              Looking forward to having you ho-ho-hop on board! 'Tis the season
              to spread joy and have Fa-la-la-la-fabulous festive fun, so let's
              Secret Santa our socks off!
            </Text>
            <Text className="font-sans">
              With sugar, spice, and all things nice,
            </Text>
            <Text className="font-sans">
              <strong>{props.author}</strong>
            </Text>
          </div>
  
        </Body>
      </Tailwind>
    </Html>
  )
}
