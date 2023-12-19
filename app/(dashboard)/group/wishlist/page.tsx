'use client'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import Aside from '@/components/Aside/Aside'
import EditAccount from '@/components/EditAccount/EditAccount'
import WishListField from '@/components/WishListField/WishListField'
import type { WishListType } from '@/types/types'
import { getMetaData } from '@/utils/websiteMetaData'
import { handleWishList } from '@/actions/handleWishList'

type MetaDataType = {
  title?: string
  description?: string
  ogImage?: string
}

export default function GroupDashboard() {
  const [loading, setLoading] = useState(false)
  const [storedWishList, setStoredWishList] = useState<WishListType[] | null>(
    null
  )
  const [currentItem, setCurrentItem] = useState({ name: '', url: '' })
  const [wishList, setWishList] = useState(storedWishList || [])
  const { user, event } = useSecretSanta()
  const supabase = createClient()

  const getWishList = async () => {
    const wishList = supabase
      .from('wishList')
      .select('*')
      .eq('eventId', event.id)
      .eq('userId', user.id)

    type wishList = QueryData<typeof wishList>

    const { data, error } = await wishList

    if (data && data.length > 0) {
      setStoredWishList(data)
    }
  }

  const handleAddItem = async (e: any) => {
    e.preventDefault()
    const metaData: MetaDataType = await getMetaData(currentItem.url)

    const newItem = {
      name: currentItem.name,
      url: currentItem.url,
      siteImage: metaData.ogImage || '',
      siteTitle: metaData.title || '',
      siteDescription: metaData.description || '',
      eventId: event.id,
      userId: user.id,
    }

    console.log(newItem)

    setWishList([...wishList, newItem])
    setCurrentItem({ name: '', url: '' })
  }

  const handleUpdateItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index: number
  ) => {
    e.preventDefault()
    const newList = wishList.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: e.target.value }
      }
      return item
    })
    setWishList(newList)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCurrentItem({ ...currentItem, [field]: e.target.value })
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault()
    const newList = wishList.filter((item, i) => i !== index)
    setWishList(newList)
  }

  useEffect(() => {
    if (user.id !== '' && event.id !== '') {
      getWishList()
    }
  }, [user, event])

  useEffect(() => {
    if (storedWishList) {
      setWishList(storedWishList)
    }
  }, [storedWishList])

  useEffect(() => {
    setLoading(false)
  }, [wishList])

  return (
    <>
      {!loading && (
        <div className="mb-20 mt-[90px] flex">
          <Aside>
            <EditAccount />
          </Aside>
          <div className="flex w-[830px] flex-col">
            <h1 className="-mb-10 ml-5 font-condensed text-[116.89px] uppercase text-white">
              wish list
            </h1>
            <span className="mb-10 ml-5 font-handwriting text-[32px] uppercase text-white">
              make your list and check it twice
            </span>

            <form
              className="flex flex-col gap-y-6"
              action={async () => {
                const data = await handleWishList(wishList)
                console.log(data)
              }}
            >
              {wishList &&
                wishList.length > 0 &&
                wishList.map((item, index) => (
                  <WishListField
                    key={index}
                    number={index + 1}
                    name={item.name}
                    roundButton={{
                      status: 'error',
                      handleClick: (e) => handleDelete(e, index),
                    }}
                    value={item}
                    onChange={(e, field) => handleUpdateItem(e, field, index)}
                  />
                ))}

              <WishListField
                key={wishList && wishList.length + 1}
                number={
                  wishList && wishList.length > 0 ? wishList.length + 1 : 1
                }
                name="newItem"
                roundButton={{
                  status: 'warning',
                  handleClick: (e) => handleAddItem(e),
                }}
                onChange={(e, field) => handleChange(e, field)}
                value={currentItem}
              />
              <button type="submit" className="ml-5 max-w-[716px]">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
