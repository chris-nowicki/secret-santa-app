'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { WishListType } from '@/types/types'

export const handleWishList = async (wishList: WishListType[]) => {
  console.log(wishList)
  const supabase = createClient(cookies())
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user.id

  // handle deleted wish list items
  const { data, error } = await supabase.from('wishList').select()
  if (data) {
    // need to  find the id of the deleted item from wishList for what is in data
    const deletedItems = data.filter(
      (item) => !wishList.find((wish) => wish.id === item.id)
    )

    await supabase
      .from('wishList')
      .delete()
      .in(
        'id',
        deletedItems.map((item) => item.id)
      )
  }

  // handle updated wish list items
  const updatedItems = wishList.filter((item) => item.id !== undefined)
  if (updatedItems.length > 0) {
    const { data, error } = await supabase
      .from('wishList')
      .upsert(updatedItems)
      .select()

    if (error) {
      console.error(error)
    }
  }

  // handle new wish list items
  const newItems = wishList.filter((item) => item.id === undefined)
  if (newItems.length > 0) {
    const { data, error } = await supabase
      .from('wishList')
      .insert(newItems)
      .select()
  }

  // handle deleted wish list items

  return
}
