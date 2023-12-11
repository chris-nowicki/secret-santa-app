'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import HeaderWithRulers from '@/components/HeaderWithRulers/HeaderWithRulers'
import ShowHidePassword from '@/components/ShowHidePassword/ShowHidePassword'
import Upload from '@/components/Upload/Upload'

export default function NewEvent() {
  const supabase = createClientComponentClient()

  const handleSubmit = async (formData: FormData) => {
    const password: string = formData.get('password') as string

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex w-[700px] flex-col items-center">
      <span className="mb-2 font-handwriting text-3xl uppercase text-white">
        awesome!
      </span>
      <HeaderWithRulers className=" text-white" heading="SIGN UP" />
      <form
        className="mt-8 w-full"
        action={async (formData) => {
          await handleSubmit(formData)
        }}
      >
        <ShowHidePassword />
        <Upload name="avatar" />
        <button type="submit" className="mt-6">
          Submit
        </button>
      </form>
    </div>
  )
}
