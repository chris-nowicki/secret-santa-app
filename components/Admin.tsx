import { useSecretSanta } from '@/context/SecretSantaContext'
import Icon from './Icon'
import Button from './UI/Button'
import { matchUsers } from '@/actions/matchUsers'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const { user, event, handleAside } = useSecretSanta()
  const router = useRouter()

  const handleMatch = async () => {
    'server-only'
    const data = await matchUsers(event.id)
    if (data) {
      console.log(data)
      router.push('/group/match')
    }
  }

  if (user.role !== 'ADMIN') return

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          handleAside('editEvent')
          document.body.classList.add('no-scroll')
        }}
      >
        <Icon id="pencil" size={24} />
      </button>
      <Button size="medium" handleClick={handleMatch} className="bg-supernova">
        match
      </Button>
    </div>
  )
}
