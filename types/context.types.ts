interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface Event {
  id: string
  name: string
  date: string
  sendReminder: boolean
}

interface Aside {
  show: boolean
  myAccount: boolean
  editEvent: boolean
}

export interface Invite {
  id: number
  profile?: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  email: string
  name: string
}

export type SecretSantaContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  showSideMenu: boolean
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>
  event: Event | null
  setEvent: React.Dispatch<React.SetStateAction<Event | null>>
  aside: Aside
  setAside: React.Dispatch<React.SetStateAction<Aside>>
  handleAside: (menu: string) => void
  invites: Invite[] | null
  setInvites: React.Dispatch<React.SetStateAction<Invite[] | null>>
  getInvites: () => void
}
