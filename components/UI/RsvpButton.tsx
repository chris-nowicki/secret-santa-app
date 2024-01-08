import Icon from '../Icon'
import clsx from 'clsx'

interface RsvpButtonProps {
  className: string
  icon: string
  handleButton: (event: React.MouseEvent<HTMLButtonElement>) => void
  heading: string
}

const RsvpButton = ({
  className,
  icon,
  handleButton,
  heading,
}: RsvpButtonProps) => {
  return (
    <button
      onClick={(event) => handleButton(event)}
      className="relative ml-[72px] flex h-[115px] max-w-[300px] items-center justify-center bg-white pl-[72px] pr-12 text-left text-3xl font-bold leading-none tracking-tight"
    >
      <div
        className={clsx(
          'center absolute -left-[72px] -top-2 h-[132px] w-[132px] rounded-full border-[6px] border-white',
          className
        )}
      >
        <Icon id={icon} size={72} />
      </div>
      {heading}
    </button>
  )
}

export default RsvpButton
