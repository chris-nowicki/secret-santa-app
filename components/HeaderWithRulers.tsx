type Props = {
  className?: string
  heading: string
}

export default function HeaderWithRulers({ className, heading }: Props) {
  return (
    <div
      className={`with-rulers font-condensed text-7xl uppercase ${className}`}
    >
      {heading}
    </div>
  )
}
