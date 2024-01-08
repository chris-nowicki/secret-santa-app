const Icon = ({
  id,
  size = 24,
}: {
  id: string
  size?: number
}): JSX.Element => {
  return (
    <svg width={size} height={size}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  )
}

export default Icon
