'use client'
import React, { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import RealtimeInvites from '@/components/Invites/RealtimeInvites'

export default function page() {
  const supabase = createClient()
  const [invites, setInvites] = React.useState<any>([])

  const handleClose = async (id?: number) => {
    const deleteStatus = await supabase
      .from('userStatus')
      .delete()
      .eq('id', id)
      .select()
    console.log(deleteStatus)
  }

  const getInvites = async () => {
    const { data } = await supabase.from('userStatus').select()
    setInvites(data)
  }

  useEffect(() => {
    getInvites()
  }, [])

  return (
    <div className='flex flex-col width-[600px] items-center gap-36 mt-[100px]'>
      <RealtimeInvites
        invites={invites}
        isCloseShowing={true}
        handleClose={() => handleClose}
      />
    </div>
  )
}
