import { useSecretSanta } from '@/context/SecretSantaContext'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import clsx from 'clsx'

interface RsvpStatusProps {
  clearFilter?: {
    isShowing: boolean
  }
  count: number
  disabled?: boolean
  status: 'success' | 'error' | 'warning'
  heading: string
}

const RsvpStatus = ({
  clearFilter,
  count,
  disabled = false,
  status,
  heading,
}: RsvpStatusProps) => {
  const { setFilteredInviteData, invites } = useSecretSanta()

  const handleFilter = (status: string) => {
    if (status === 'ALL') {
      setFilteredInviteData({
        data: invites,
        filter: 'ALL',
      })
      return
    }
    const filter = [...invites]
    const filtered = filter.filter(
      (invite) => invite.status === status.toUpperCase()
    )
    setFilteredInviteData({
      data: filtered,
      filter: status,
    })
  }

  const resetFilter = () => [
    setFilteredInviteData({
      data: invites,
      filter: 'ALL',
    }),

    console.log('we get here'),
  ]

  return (
    <div
      className={clsx(
        ' h-[120px] w-full  border-[6px] border-white',
        disabled ? 'opacity-50' : '',
        status === 'success'
          ? 'bg-spanishGreen'
          : status === 'warning'
            ? 'bg-supernova'
            : status === 'error' && 'bg-orangeRed'
      )}
    >
      <div className="flex">
        <div
          className={clsx(
            'relative  -left-8 -top-16 z-10',
            status === 'success'
              ? 'text-spanishGreen'
              : status === 'warning'
                ? 'text-supernova'
                : status === 'error' && 'text-orangeRed'
          )}
        >
          <div className="outline-text number-with-outline relative z-0">
            {count}
          </div>
          <div className="number-with-outline absolute left-0 top-0 z-10">
            {count}
          </div>
        </div>
        <div
          className={clsx(
            'relative flex w-full items-center font-handwriting text-4xl text-white'
          )}
        >
          {clearFilter?.isShowing && (
            <Button
              size="small"
              handleClick={resetFilter}
              className={`absolute -top-4 left-6 z-30 whitespace-nowrap ${
                status === 'success' ? 'bg-countyGreen' : ''
              } ${status === 'warning' ? 'bg-spicyMustard text-white' : ''} ${
                status === 'error' ? 'bg-cognac' : ''
              }`}
            >
              <div className="flex items-center gap-1 font-sans">
                <Icon id="close" />
                Clear Filter
              </div>
            </Button>
          )}
          <button
            className="flex w-full"
            onClick={() =>
              handleFilter(
                heading === 'pending' ? 'INVITED' : heading.toUpperCase()
              )
            }
            disabled={disabled}
          >
            {heading.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RsvpStatus
