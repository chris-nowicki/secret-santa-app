export interface SecretSantaContextType {
  user: User
  setUser: (user: User) => void
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
  attendee: AttendeeType
  setAttendee: React.Dispatch<React.SetStateAction<AttendeeType>>
  fetchAttendee: (id: string) => void
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export type InviteType = {
  id: string
  status: string
  profile: {
    name: string
    email: string
    avatar?: string
    role: string
  }
}

export type FilteredDataInviteType = {
  data: InviteType[]
  filter: string
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
  viewWishList: boolean
}

export type StatusCountType = {
  accepted: number
  invited: number
  declined: number
}

export type AttendeeType = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export type WishListType = {
  id?: number
  name: string
  url: string
  userId: string
  createdAt?: string
  updatedAt?: string
  order?: number
  eventId: string
  siteImage: string
  siteTitle: string
  siteDescription: string
}
