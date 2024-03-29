'use client'
import { useSecretSanta } from '@/context/SecretSantaContext'
import clsx from 'clsx'
import Link from 'next/link'

export default function Nav() {
  const { showSideMenu, setShowSideMenu } = useSecretSanta()

  return (
    <div
      className={clsx(
        'l-0 fixed top-0 z-20 h-screen w-[460px] flex-col justify-between bg-supernova px-12 pb-12 pt-[160px]',
        showSideMenu ? 'flex' : 'hidden'
      )}
    >
      <nav className="top-nav">
        <ul>
          <li>
            <Link href="/group/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/group?eid=asdjf;asdkl;fjasd/dashboard">Our Group</Link>
          </li>
          <li>
            <Link href="/group/wishlist">My Wish List</Link>
          </li>
        </ul>
      </nav>

      <nav className="bottom-nav">
        <div className="mb-2 font-condensed text-5xl uppercase text-spanishGreen">
          Past Events
        </div>
        <ul>
          <li>
            <a href="#">
              <div className="text-2xl font-bold">Smith Christmas</div>
              <div>December 23, 2023</div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="text-2xl font-bold">Smith Christmas</div>
              <div>December 23, 2023</div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
