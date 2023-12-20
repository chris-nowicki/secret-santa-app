import clsx from 'clsx'
import { useSecretSanta } from '@/context/SecretSantaContext'
import Icon from '../Icon/Icon'

export default function Aside({ children }: { children: React.ReactNode }) {
  const { aside, setAside } = useSecretSanta()

  const showAside = () => {
    setAside({ ...aside, show: !aside.show })
  }

  return (
    <div
      className={clsx(
        'fixed right-0 top-0 z-30 h-screen w-[calc(100%-460px)] flex-col bg-spanishGreen overflow-y-scroll',
        aside.show ? 'flex' : 'hidden'
      )}
    >
      <div className="absolute right-6 top-6">
        <button onClick={showAside}>
          <Icon id="close" size={56} />
        </button>
      </div>
      <div className="mt-20 flex justify-center">{children}</div>
    </div>
  )
}
