// Packages
import { ReactElement, useMemo, memo } from 'react'
import Link from 'next/link'

// Icons
import { FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from 'react-icons/fa'

interface PaginationProps {
  total: number
  next: string | null
  previous: string | null
  page: number
}

const Pagination = ({ total, next, previous, page }: PaginationProps): ReactElement => {
  const totalPages = useMemo(() => Math.ceil(total / 10), [total])

  const nextPage = useMemo(() => {
    if (next) {
      return String(page + 1)
    }

    return null
  }, [next, page])

  const previousPage = useMemo(() => {
    if (previous) {
      return String(page - 1)
    }

    return null
  }, [previous, page])

  return (
    <div className="flex justify-center sm:justify-end my-4 px-4 2xl:w-4/5 m-auto">
      {previous && previousPage ? (
        <Link href={previousPage}>
          <a className="flex items-center hover:text-purple-700 cursor-pointer">
            <ChevronLeftIcon />
            <span>Anterior</span>
          </a>
        </Link>
      ) : (
        <a className="flex items-center text-gray-600 cursor-not-allowed">
          <ChevronLeftIcon />
          <span>Anterior</span>
        </a>
      )}

      <span className="mx-2">{`${page} de ${totalPages}`}</span>

      {next && nextPage ? (
        <Link href={nextPage}>
          <a className="flex items-center hover:text-purple-700 cursor-pointer">
            <span>Próxima</span>
            <ChevronRightIcon />
          </a>
        </Link>
      ) : (
        <a className="flex items-center text-gray-600 cursor-not-allowed">
          <span>Próxima</span>
          <ChevronRightIcon />
        </a>
      )}
    </div>
  )
}

export default memo(Pagination)
