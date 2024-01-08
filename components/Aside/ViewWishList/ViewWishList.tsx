'use client'
import { useEffect } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useWishlist } from '@/hooks/useWishlist'
import Card from '@/components/UI/Card'
import EmptyCard from '@/components/UI/EmptyCard'
import { extractDomain } from '@/utils/extractDomain'
import Icon from '@/components/Icon/Icon'
import Link from 'next/link'

export default function ViewWishList() {
  const { user, event, aside, attendee, setAside } = useSecretSanta()
  const { wishList, loading, fetchWishList } = useWishlist(
    attendee.id,
    event.id
  )

  const handleClick = () => {
    console.log('clicked')
  }

  useEffect(() => {
    fetchWishList()
    document.body.classList.add('no-scroll')
  }, [fetchWishList])

  return (
    <>
      {aside.viewWishList && (
        <div className="mb-96 w-[794px]">
          <div className="flex items-center justify-between">
            <h1 className="font-condensed text-[116.89px] uppercase text-white">
              wish list
            </h1>
            {user.id === attendee.id && (
              <button
                onClick={() => {
                  document.body.classList.remove('no-scroll')
                  setAside({
                    ...aside,
                    show: false,
                    viewWishList: false,
                  })
                }}
                className="w-[112px] gap-2 rounded-full bg-supernova py-2 font-sans text-sm font-bold uppercase"
              >
                <Link
                  href="/group/wishlist/"
                  className="flex items-center justify-center gap-2"
                >
                  <Icon id="pencil" size={24} />
                  edit
                </Link>
              </button>
            )}
          </div>
          <div className="relative -ml-5 -mt-6 flex flex-col">
            <h1 className="absolute -left-[70px] top-10 font-handwriting text-3xl uppercase text-white">
              for
            </h1>
            {loading ? (
              <EmptyCard />
            ) : (
              <>
                <Card
                  key={attendee.id}
                  avatar={{
                    alt: 'Avatar',
                    avatar: attendee ? attendee.avatar : '',
                    showSantaHat: false,
                    letter: attendee ? attendee.name[0].substring(0, 1) : '',
                  }}
                  email={attendee ? attendee.email : ''}
                  name={attendee ? attendee.name : ''}
                  isCloseShowing={false}
                />
                <div className="ml-5 mt-16 flex flex-col gap-6">
                  {wishList &&
                    wishList.map((item, index) => (
                      <div className="border-b-4 border-silverTree">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-6 text-3xl text-white">
                            <span className="font-handwriting">
                              {index + 1}
                            </span>
                            <h1 className="font-sans uppercase">{item.name}</h1>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            className="flex w-[112px] justify-center  rounded-full bg-cruseo py-2 font-sans text-sm font-bold uppercase text-white"
                          >
                            details
                          </a>
                        </div>
                        <div className="mb-6 ml-8 mt-4 flex border border-silverTree">
                          <div className="flex flex-col gap-4 p-4 text-white">
                            <span className="font-sans uppercase tracking-wide">
                              {extractDomain(item.url)}
                            </span>
                            <h1 className="font-sans text-3xl uppercase">
                              {item.siteTitle}
                            </h1>
                            <p className="text-md font-sans">
                              {item.siteDescription}
                            </p>
                          </div>
                          {item.siteImage && (
                            <img
                              src={item.siteImage}
                              alt={item.name}
                              width="378"
                              className="object-fill"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
