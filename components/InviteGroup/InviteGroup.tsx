import Card from '../Card/Card'
import RoundButton from '../RoundButton/RoundButton'

const InviteGroup = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  const handleClose = () => {
    console.log('closed card')
  }

  return (
    <div>
      {/* form */}
      <div className="label ml-5 text-[18.52px] text-white">
        Invite a friend or family member
      </div>
      <div className="mb-10 ml-5 flex items-center gap-5 bg-spanishGreen pl-4 pr-4 pt-4">
        <div className="field flex-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="input"
            placeholder=""
          />
        </div>
        <div className="field flex-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="input"
            placeholder=""
          />
        </div>
        <RoundButton handleClick={handleClick} status="warning" />
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <Card
          avatar={{
            alt: 'Avatar',
            avatar: 'https://picsum.photos/seed/1701322447715/300/300',
          }}
          email="email@email.com"
          name="Amy Dutton"
          handleClose={handleClose}
        />
        <Card
          avatar={{
            alt: 'Avatar',
            avatar: 'https://picsum.photos/seed/1701322447715/300/300',
          }}
          email="cnowicki@gmail.com"
          name="Chris Nowicki"
          handleClose={handleClose}
        />
      </div>
    </div>
  )
}

export default InviteGroup
