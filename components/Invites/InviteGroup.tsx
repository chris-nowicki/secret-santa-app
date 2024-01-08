import { useSecretSanta } from '@/context/SecretSantaContext'
import { createClient } from '@/utils/supabase/client'
import { sendInvite } from '@/actions/sendInvite'
import Icon from '../Icon/Icon'
import Invites from './Invites'

export default function InviteGroup() {
  const supabase = createClient()
  const { event, user } = useSecretSanta()

  const handleNewInvite = async (data: any) => {
    await supabase.from('userStatus').insert({
      eventId: event.id,
      userId: data.userId,
      status: 'INVITED',
      name: data.name,
      email: data.email,
    })
  }

  return (
    <div>
      {/* form */}
      <div className="label ml-5 text-[18.52px] text-white">
        Invite a friend or family member
      </div>

      <form
        id="newInvite-form"
        action={async (formData) => {
          const emailData = {
            author: user.name,
            eventName: event.name,
            eventDate: event.date,
          }

          const data = await sendInvite(formData, emailData)
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

      <Invites isCloseShowing={true} />
    </div>
  )
}
