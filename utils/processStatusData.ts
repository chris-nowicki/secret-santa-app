// processStatusData.ts
export type UserStatus = {
  status: 'DECLINED' | 'INVITED' | 'ACCEPTED'
}

export type StatusCount = {
  declined: number
  invited: number
  accepted: number
}

export const processStatusData = (data: UserStatus[]): StatusCount => {
  const declined = data.filter((status) => status.status === 'DECLINED').length
  const pending = data.filter((status) => status.status === 'INVITED').length
  const accepted = data.filter((status) => status.status === 'ACCEPTED').length

  return { declined, invited: pending, accepted }
}
