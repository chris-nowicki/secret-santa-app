'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { WishListType } from '@/types/types'

export const handleWishList = async (wishList: WishListType[]) => {
  const supabase = createClient(cookies())
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // handle deleted wish list items
  // get all items from wishList table
  const { data, error } = await supabase.from('wishList').select()

  // if there is data, need to find the id of the deleted item from wishList for what is in data
  if (data) {
    const deletedItems = data.filter(
      (item) => !wishList.find((wish) => wish.id === item.id)
    )

    // delete the deleted items from wishList
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

  // if there are updated items, need to update the wishList table
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

  // if there are new items, need to add them to the wishList table
  if (newItems.length > 0) {
    const { data, error } = await supabase
      .from('wishList')
      .insert(newItems)
      .select()

    if (error) {
      console.error(error)
    }
  }

  return
}
