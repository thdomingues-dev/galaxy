// Packages
import { ReactElement, memo, useState, useMemo } from 'react'
import Link from 'next/link'

// Image
import Image from 'next/image'

// Icons
import { FaChevronLeft as ChevronLeftIcon, FaChevronRight as ChevronRightIcon } from 'react-icons/fa'

interface RelatedItemsProps {
  title: string
  resource: string
  items: Array<{
    id: string
    name: string
  }>
  hasLink?: boolean
}

const RelatedItems = ({ title, resource, items, hasLink = false }: RelatedItemsProps): ReactElement => {
  const [page, setPage] = useState(1)
  const pages = Math.ceil(items.length / 5)
  const total = items.length

  const nextPage = () => {
    if (page + 1 <= pages) setPage(page + 1)
  }

  const previousPage = () => {
    if (page - 1 >= 1) setPage(page - 1)
  }

  const finalArray = useMemo(() => {
    if (page === 1) return items.slice(0, 5)
    if (page === pages) return items.slice(page * 5 - 5, total)

    return items.slice(page * 5 - 5, page * 5)
  }, [items, page, total, pages])

  return (
    <section className="bg-white shadow-lg w-full 2xl:w-3/4 rounded-lg mb-4">
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {items.length ? (
          items.length > 5 ? (
            <div className="flex justify-center items-center gap-1">
              <button
                className="rounded-lg shadow-lg w-8 h-8 flex flex-col items-center justify-center hover:bg-purple-700 hover:text-white"
                onClick={previousPage}
              >
                <ChevronLeftIcon />
              </button>
              <ul className="text-center grid grid-cols-2 gap-1 2xl:flex 2xl:justify-start mt-4">
                {finalArray.map((item, index) =>
                  hasLink ? (
                    <li key={index}>
                      <Link href={`/${resource.substring(0, resource.length - 1)}/${item.id}`}>
                        <a className="flex flex-col items-center w-48 hover:shadow-lg hover:rounded-lg hover:text-purple-700">
                          <Image
                            className="rounded-lg"
                            src={`https://starwars-visualguide.com/assets/img/${resource}/${item.id}.jpg`}
                            height={64}
                            width={64}
                            alt={item.name}
                          />
                          <p className="text-sm">{item.name}</p>
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <li key={index} className="flex flex-col items-center w-48">
                      <div className="w-16">
                        <Image
                          className="rounded-lg"
                          src={`https://starwars-visualguide.com/assets/img/${resource}/${item.id}.jpg`}
                          height={64}
                          width={64}
                          alt={item.name}
                        />
                      </div>
                      <p className="text-sm">{item.name}</p>
                    </li>
                  ),
                )}
              </ul>
              <button
                className="rounded-lg shadow-lg w-8 h-8 flex flex-col items-center justify-center hover:bg-purple-700 hover:text-white"
                type="button"
                onClick={nextPage}
              >
                <ChevronRightIcon />
              </button>
            </div>
          ) : (
            <ul className="text-center grid grid-cols-2 gap-1 md:flex md:justify-start mt-4">
              {items.map((item, index) =>
                hasLink ? (
                  <li key={index}>
                    <Link href={`/${resource.substring(0, resource.length - 1)}/${item.id}`}>
                      <a className="flex flex-col items-center sm:w-48 hover:shadow-lg hover:rounded-lg hover:text-purple-700">
                        <Image
                          className="rounded-lg"
                          src={`https://starwars-visualguide.com/assets/img/${resource}/${item.id}.jpg`}
                          width={64}
                          height={64}
                          layout="intrinsic"
                          alt={item.name}
                        />
                        <p className="text-sm">{item.name}</p>
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li key={index} className="flex flex-col items-center sm:w-48">
                    <Image
                      className="rounded-lg"
                      src={`https://starwars-visualguide.com/assets/img/${resource}/${item.id}.jpg`}
                      height={64}
                      width={64}
                      alt={item.name}
                    />
                    <p className="text-sm">{item.name}</p>
                  </li>
                ),
              )}
            </ul>
          )
        ) : (
          <>
            <br />
            <span>Nenhum registro encontrado</span>
          </>
        )}
      </div>
    </section>
  )
}

export default memo(RelatedItems)
