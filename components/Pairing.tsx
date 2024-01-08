import Card, { type CardProps } from './UI/Card'
import EmptyCard from './UI/EmptyCard'

interface PairingProps {
  secretSanta: CardProps
  pairing: CardProps
  showPairing: boolean
}

const Pairing = ({ secretSanta, pairing, showPairing }: PairingProps) => {
  return (
    <div className="flex items-center gap-2">
      <Card {...secretSanta} />
      <div className="bg-supernova h-[10px] min-w-[40px] flex-1" />
      {showPairing ? <Card {...pairing} /> : <EmptyCard />}
    </div>
  )
}

export default Pairing
