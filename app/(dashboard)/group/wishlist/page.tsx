'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSecretSanta } from '@/context/SecretSantaContext'
import { useWishlist } from '@/hooks/useWishlist'
import { handleWishList } from '@/actions/handleWishList'
import { createClient } from '@/utils/supabase/client'
import Aside from '@/components/Aside/Aside'
import EditAccount from '@/components/EditAccount/EditAccount'
import WishListField from '@/components/WishListField/WishListField'
import Loading from '@/components/Spinner/LoadingSpinner'

const supabase = createClient()

export default function WishList() {
  const [loading, setLoading] = useState(false)
  const { user, event } = useSecretSanta()
  const {
    wishList,
    setWishList,
    currentItem,
    setCurrentItem,
    addItem,
    updateItem,
    deleteItem,
  } = useWishlist()

  const fetchWishList = useCallback(async () => {
    if (user.id && event.id) {
      try {
        const { data, error } = await supabase
          .from('wishList')
          .select('*')
          .eq('eventId', event.id)
          .eq('userId', user.id)

        if (error) throw error
        setWishList(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [user.id, event.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCurrentItem({ ...currentItem, [field]: e.target.value })
  }

  useEffect(() => {
    fetchWishList()
  }, [fetchWishList])

  if (loading) return <Loading />

  return (
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
            await handleWishList(wishList)
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
                  handleClick: (e) => deleteItem(e, index),
                }}
                value={item}
                onChange={(e, field) => updateItem(e, field, index)}
              />
            ))}

          <WishListField
            key={wishList && wishList.length + 1}
            number={wishList && wishList.length > 0 ? wishList.length + 1 : 1}
            name="newItem"
            roundButton={{
              status: 'warning',
              handleClick: (e) => addItem(e),
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
  )
}
