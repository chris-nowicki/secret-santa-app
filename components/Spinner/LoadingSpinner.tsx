import Spinner from './Spinner'

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Spinner className="h-44 w-44" />
      <h1 className="font-handwriting text-3xl text-white">Loading ...</h1>
    </div>
  )
}

export default Loading
