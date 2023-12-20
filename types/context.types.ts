export type SecretSantaContextType = {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  showSideMenu: boolean
  setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>
  event: EventType
  setEvent: React.Dispatch<React.SetStateAction<EventType>>
  aside: AsideType
  setAside: React.Dispatch<React.SetStateAction<AsideType>>
  handleAside: (menu: string) => void
  invites: InviteType[]
  setInvites: React.Dispatch<React.SetStateAction<InviteType[]>>
  statusCount: StatusCountType
  setStatusCount: React.Dispatch<React.SetStateAction<StatusCountType>>
  filteredInviteData: FilteredDataInviteType
  setFilteredInviteData: React.Dispatch<
    React.SetStateAction<FilteredDataInviteType>
  >
}

export type InviteType = {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  status: string
  createdAt?: string
  updatedAt?: string
  event: {
    id: string
    name: string
    date: string
    sendReminder: boolean
  }
}

export type FilteredDataInviteType = {
  data: InviteType[]
  filter: string
}

export type UserType = {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export type EventType = {
  id: string
  name: string
  date: string
  sendReminder: boolean
}

export type AsideType = {
  show: boolean
  myAccount: boolean
  editEvent: boolean
}

export type StatusCountType = {
  accepted: number
  invited: number
  declined: number
}
