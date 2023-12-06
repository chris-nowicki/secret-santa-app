import Login from '@/components/Login'
import Link from 'next/link'

export default async function Dashboard() {
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mt-20 text-4xl">Dashboard</h1>
      <Login />
      <div className="mt-4">
        <Link href="/event/new" className="text-2xl">
          New Event
        </Link>
      </div>
    </div>
  )
}
