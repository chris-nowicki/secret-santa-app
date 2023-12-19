import RoundButton, { RoundButtonProps } from '../RoundButton/RoundButton'

interface WishListFieldProps {
  roundButton: RoundButtonProps
  name: string
  number: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void
  value?: {
    name: string
    url: string
  }
}

const WishListField = ({
  roundButton,
  name,
  number,
  onChange,
  value,
}: WishListFieldProps) => {
  return (
    <div className="ml-5 flex w-full flex-col gap-y-2">
      <div className="flex w-full items-center">
        <div className="mr-5 flex w-[710px] items-center gap-5 bg-white pl-8">
          <div>
            <label htmlFor={name} className="text-3xl">
              {number}
            </label>
          </div>
          <input
            type="text"
            id={name}
            name={name}
            className="font-bold outline-none"
            onChange={(e) => onChange(e, 'name')}
            value={value?.name}
          />
        </div>
        <RoundButton {...roundButton} />
      </div>

      <div className="flex w-[710px] items-start gap-2 pl-8">
        <img src="/images/l-bracket.svg" alt="" />
        <div className="flex flex-1 items-center bg-white">
          <div className="pl-6">
            <label htmlFor={`${name}-url`}>URL</label>
          </div>
          <input
            type="text"
            className="short flex-1"
            name={`${name}-url`}
            id={`${name}-url`}
            value={value?.url}
            onChange={(e) => onChange(e, 'url')}
          />
        </div>
      </div>
    </div>
  )
}

export default WishListField
