import Icon from '../Icon'

interface IndicatorProps {
  status: 'ACCEPTED' | 'INVITED' | 'DECLINED'
}

const Indicator = ({ status }: IndicatorProps) => {
  return (
    <>
      {status === 'ACCEPTED' && (
        <div className="indicator bg-spanishGreen text-white">
          <Icon id="check" size={16} />
        </div>
      )}

      {status === 'DECLINED' && (
        <div className="indicator bg-orangeRed text-white">
          <Icon id="minus" size={16} />
        </div>
      )}

      {status === 'INVITED' && (
        <div className="indicator bg-supernova text-black">
          <Icon id="question" size={16} />
        </div>
      )}
    </>
  )
}

export default Indicator
