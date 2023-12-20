import { useCallback, useState } from 'react'
import { WishListType } from '@/types/types'
import { getMetaData } from '@/utils/websiteMetaData'
import { createClient } from '@/utils/supabase/client'
import { UserType, EventType } from '@/types/context.types'

type MetaDataType = {
  title?: string
  description?: string
  ogImage?: string
}

type UseWishListType = {
  user: UserType
  event: EventType
}

const supabase = createClient()

export const useWishlist = ({ user, event }: UseWishListType) => {
  const [wishList, setWishList] = useState([] as WishListType[])
  const [currentItem, setCurrentItem] = useState({ name: '', url: '' })
  const [loading, setLoading] = useState(false)

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

  const addItem = async (e: any) => {
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

    setWishList([...wishList, newItem])
    setCurrentItem({ name: '', url: '' })
  }

  const updateItem = (
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

  const deleteItem = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault()
    const newList = wishList.filter((item, i) => i !== index)
    setWishList(newList)
  }

  return {
    loading,
    fetchWishList,
    wishList,
    setWishList,
    currentItem,
    setCurrentItem,
    addItem,
    updateItem,
    deleteItem,
  }
}
