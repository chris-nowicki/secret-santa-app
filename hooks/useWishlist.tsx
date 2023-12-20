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

const supabase = createClient()

export const useWishlist = (userId: string, eventId: string) => {
  const [wishList, setWishList] = useState([] as WishListType[])
  const [currentItem, setCurrentItem] = useState({ name: '', url: '' })
  const [loading, setLoading] = useState(false)

  const fetchWishList = useCallback(async () => {
    if (userId && eventId) {
      try {
        const { data, error } = await supabase
          .from('wishList')
          .select('*')
          .eq('eventId', eventId)
          .eq('userId', userId)

        if (error) throw error
        setWishList(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [userId, eventId])

  const addItem = async (e: any) => {
    e.preventDefault()
    const metaData: MetaDataType = await getMetaData(currentItem.url)

    const newItem = {
      name: currentItem.name,
      url: currentItem.url,
      siteImage: metaData.ogImage || '',
      siteTitle: metaData.title || '',
      siteDescription: metaData.description || '',
      eventId: eventId,
      userId: userId,
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
    const newList = wishList.filter((_, i) => i !== index)
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
