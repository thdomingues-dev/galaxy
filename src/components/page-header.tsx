// Packages
import { ReactElement, memo } from 'react'
import { useRouter } from 'next/router'

// Icons
import { HiArrowNarrowLeft as ArrowLeftIcon } from 'react-icons/hi'

const PageHeader = (): ReactElement => {
  const router = useRouter()

  const handleOnClick = () => {
    return router.pathname === '/' ? router.push('/') : router.back()
  }

  return (
    <div className="w-4/5 m-auto py-4 flex justify-between">
      <span className="font-bold">Galaxypedia</span>
      <span className="flex items-center cursor-pointer" onClick={handleOnClick}>
        <ArrowLeftIcon size={20} className="mr-1" />
        Voltar
      </span>
    </div>
  )
}
export default memo(PageHeader)
