import { useSecretSanta } from '@/context/SecretSantaContext'
import Card from '../Card/Card'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { sendInvite } from '@/actions/sendInvite'
import Icon from '../Icon/Icon'

type Invite = {
  id: number
  profile?: {
    id: string
    name: string
    email: string
    avatar: string
  }

  email: string
  name: string
}

export default function InviteGroup() {
  const [invites, setInvites] = useState<Invite[] | null>([])
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const { event } = useSecretSanta()

  const getInvites = async () => {
    const { data, error } = await supabase
      .from('userStatus')
      .select(`id, profile(id, name, email, avatar), email, name`)
      .eq('eventId', event.id)
    setInvites(data)
  }

  const handleClose = async (id?: number) => {
    console.log(id)
    const deleteStatus = await supabase
      .from('userStatus')
      .delete()
      .eq('id', id)
      .select()
    console.log(deleteStatus.status)
    const newInvites = invites!.filter((invite) => invite.id !== id)
    setInvites(newInvites)
  }

  const handleNewInvite = async (data: any) => {
    console.log(data)
    const userStatus = await supabase
      .from('userStatus')
      .insert({
        eventId: event.id,
        userId: data.userId,
        status: 'INVITED',
        name: data.name,
        email: data.email,
      })
      .select()

    setInvites((prevInvites) => [
      ...(prevInvites || []),
      {
        id: userStatus.data![0].id,
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        status: 'INVITED',
      },
    ])
  }

  useEffect(() => {
    getInvites()
  }, [])

  useEffect(() => {
    console.log(invites)
  }, [invites])

  return (
    <div>
      {/* form */}
      <div className="label ml-5 text-[18.52px] text-white">
        Invite a friend or family member
      </div>

      <form
        id="newInvite-form"
        action={async (formData) => {
          const data = await sendInvite(formData)
          handleNewInvite(data)
          const form = document.getElementById(
            'newInvite-form'
          ) as HTMLFormElement
          form.reset()
        }}
        className="mb-10 ml-5 flex items-center gap-5 bg-spanishGreen pl-4 pr-4 pt-4"
      >
        <input type="hidden" name="eventId" value={event.id} />
        <div className="field flex-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="input"
            placeholder=""
          />
        </div>
        <div className="field flex-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="input"
            placeholder=""
          />
        </div>
        <button type="submit" className="custom">
          <Icon id="plus" />
        </button>
      </form>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {loading &&
          invites &&
          invites.map((invite) => (
            <Card
              key={invite.id}
              avatar={{
                alt: 'Avatar',
                avatar: 'https://picsum.photos/seed/1701322447715/300/300',
              }}
              email={invite.profile ? invite.profile.email : invite.email}
              name={invite.profile ? invite.profile.name : invite.name}
              handleClose={() => handleClose(invite.id)}
              isCloseShowing={true}
            />
          ))}
      </div>
    </div>
  )
}
