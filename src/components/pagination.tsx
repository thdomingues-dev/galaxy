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
      const prefix = '/characters/'
      const parsedUrl = prefix.concat(String(page + 1))

      return parsedUrl
    }

    return null
  }, [next, page])

  const previousPage = useMemo(() => {
    if (previous) {
      const prefix = '/characters/'
      const parsedUrl = prefix.concat(String(page - 1))

      return parsedUrl
    }

    return null
  }, [previous, page])

  return (
    <div className="flex justify-end mt-8 px-72">
      {previous && previousPage ? (
        <Link href={previousPage}>
          <a className="flex items-center hover:text-yellow-400 cursor-pointer">
            <ChevronLeftIcon />
            <span>Anterior</span>
          </a>
        </Link>
      ) : (
        <a className="flex items-center">
          <ChevronLeftIcon />
          <span>Anterior</span>
        </a>
      )}

      <span className="mx-2">{`${page} de ${totalPages}`}</span>

      {next && nextPage ? (
        <Link href={nextPage}>
          <a className="flex items-center hover:text-yellow-400 cursor-pointer">
            <span>Próxima</span>
            <ChevronRightIcon />
          </a>
        </Link>
      ) : (
        <a className="flex items-center">
          <span>Próxima</span>
          <ChevronRightIcon />
        </a>
      )}
    </div>
  )
}

export default memo(Pagination)
