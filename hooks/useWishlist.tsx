import { useState } from 'react'
import { WishListType } from '@/types/types'
import { getMetaData } from '@/utils/websiteMetaData'
import { useSecretSanta } from '@/context/SecretSantaContext'

type MetaDataType = {
  title?: string
  description?: string
  ogImage?: string
}

export const useWishlist = () => {
  const [wishList, setWishList] = useState([] as WishListType[])
  const [currentItem, setCurrentItem] = useState({ name: '', url: '' })
  const { user, event } = useSecretSanta()

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
    wishList,
    setWishList,
    currentItem,
    setCurrentItem,
    addItem,
    updateItem,
    deleteItem,
  }
}
