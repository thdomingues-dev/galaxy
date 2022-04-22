// Packages
import { ReactElement, memo } from 'react'
import Link from 'next/link'

// Image
import Image from 'next/image'

interface RelatedItemsProps {
  title: string
  resource: string
  items: Array<{
    id: string
    name: string
  }>
  hasLink?: boolean
}

const RelatedItems = ({ title, resource, items, hasLink = false }: RelatedItemsProps): ReactElement => (
  <section className="bg-white shadow-lg w-3/4 rounded-lg mb-4">
    <div className="p-4 w-full">
      <span className="text-lg font-bold">{title}</span>
      {items.length ? (
        <ul className="text-left flex justify-start mt-4">
          {items.map((item, index) =>
            hasLink ? (
              <li key={index}>
                <Link href={`/${resource.substring(0, resource.length - 1)}/${item.id}`}>
                  <a className="flex flex-col items-center w-48">
                    <div className="w-16">
                      <Image
                        className="rounded-lg"
                        src={`https://starwars-visualguide.com/assets/img/${resource}/${item.id}.jpg`}
                        height={64}
                        width={64}
                        alt={item.name}
                      />
                    </div>
                    {item.name}
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
                {item.name}
              </li>
            ),
          )}
        </ul>
      ) : (
        <>
          <br />
          <span>Nenhum registro encontado</span>
        </>
      )}
    </div>
  </section>
)

export default memo(RelatedItems)
