import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import clsx from 'clsx'

interface RsvpStatusProps {
  clearFilter?: {
    isShowing: boolean
    handleClick: () => void
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
            'relative -left-8 -top-16',
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
            'relative pt-10 font-handwriting text-4xl uppercase text-white'
          )}
        >
          {clearFilter?.isShowing && (
            <Button
              size="small"
              handleClick={() => {}}
              className={`absolute -top-2 whitespace-nowrap ${
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
          {heading}
        </div>
      </div>
    </div>
  )
}

export default RsvpStatus
