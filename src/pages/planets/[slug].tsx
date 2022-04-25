// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'

// Api
import api from '../../services/api'

// Components
import { Pagination, ListItem } from '../../components'

// Models
import { Planet } from '../../models/resources'

interface PlanetsProps {
  page: number
  total: number
  next: string | null
  previous: string | null
  planets: Array<Planet>
}

const Planets = ({ planets, page, total, next, previous }: PlanetsProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Galaxypedia | Planetas</title>
      </Head>
      <div className=" flex flex-col justify-center text-center">
        <h1 className="text-xl md:text-2xl text-gray-600 mb-2">Planetas</h1>
        <ul className="w-4/5 m-auto py-4 grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-4 xl:grid-cols-5 xl:gap-8 xl:px-40">
          {planets.map((planet, index) => {
            const planetIndex = planet.url.split('/').slice(5, -1)[0]

            return (
              <li key={index} className="w-full rounded-lg">
                <ListItem
                  title={planet.name}
                  link={planetIndex}
                  referece="planets"
                  referenceId={planetIndex}
                  altMessage={planet.name}
                />
              </li>
            )
          })}
        </ul>
      </div>
      <Pagination resource="planets" page={page} total={total} next={next} previous={previous} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('planets')

  const paths = [...Array(Math.ceil(data?.count / 10))].map((_, index) => ({
    params: { slug: (index + 1).toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params || { slug: '1' }
  const { data } = await api.get(`planets/?page=${slug}`)

  return {
    props: {
      page: Number(slug),
      total: data.count,
      next: data.next,
      previous: data.previous,
      planets: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Planets
