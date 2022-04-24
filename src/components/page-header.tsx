// Packages
import { ReactElement, memo } from 'react'
import { useRouter } from 'next/router'

// Icons
import { HiArrowNarrowLeft as ArrowLeftIcon } from 'react-icons/hi'

const PageHeader = (): ReactElement => {
  const router = useRouter()

  const handleOnClickBack = () => router.back()

  const handleOnClickLogo = () => router.push('/')

  return (
    <div className="2xl:w-4/5 m-auto py-4 flex justify-between w-full px-4">
      <h1 className="text-lg text-purple-700 font-bold cursor-pointer" onClick={handleOnClickLogo}>
        Galaxypedia
      </h1>
      <button className="flex items-center cursor-pointer hover:text-purple-700" onClick={handleOnClickBack}>
        <ArrowLeftIcon size={20} className="mr-1" />
        Voltar
      </button>
    </div>
  )
}
export default memo(PageHeader)
