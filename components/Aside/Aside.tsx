import clsx from 'clsx'
import { useSecretSanta } from '@/context/SecretSantaContext'
import Icon from '../Icon/Icon'

export default function Aside({ children }: { children: React.ReactNode }) {
  const { aside, setAside } = useSecretSanta()
  return (
    <div
      className={clsx(
        'fixed right-0 top-0 z-30 h-screen w-[calc(100%-460px)] flex-col bg-spanishGreen',
        aside ? 'flex' : 'hidden'
      )}
    >
      <div className="absolute right-6 top-6">
        <button onClick={() => setAside((prevState) => !prevState)}>
          <Icon id="close" size={56} />
        </button>
      </div>
      <div className="flex justify-center mt-20">{children}</div>
    </div>
  )
}
