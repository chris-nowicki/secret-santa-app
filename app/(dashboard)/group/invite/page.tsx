import Login from '@/components/Login'
import Link from 'next/link'

export default async function GroupInvite() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mt-20 text-4xl">Group Invite</h1>
      <Login />
      <div className="mt-4"></div>
    </div>
  )
}
