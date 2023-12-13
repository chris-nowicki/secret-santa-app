export type SecretSantaContextType = {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
  }
  setUser: React.Dispatch<React.SetStateAction<any>>
  showSideMenu: boolean
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>
  event: {
    id: string
    name: string
    date: string
    sendReminder: boolean
  }
  setEvent: React.Dispatch<React.SetStateAction<any>>
  aside: {
    show: boolean
    myAccount: boolean
    editEvent: boolean
  }
  setAside: React.Dispatch<React.SetStateAction<any>>
  handleAside: (menu: string) => void
  invites: any[]
  setInvites: React.Dispatch<React.SetStateAction<any>>
  statusCount: {
    accepted: number
    invited: number
    declined: number
  }
  setStatusCount: React.Dispatch<React.SetStateAction<any>>
}
