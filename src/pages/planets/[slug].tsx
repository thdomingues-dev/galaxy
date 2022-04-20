// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

// Api
import api from '../../services/api'

// Components
import Pagination from '../../components/pagination'
import ListItem from '../../components/list-item'

export interface Planet {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: Array<string>
  films: Array<string>
  created: string
  edited: string
  url: string
}

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
      <div className=" flex flex-col justify-center text-center pt-16">
        <ul className="grid grid-cols-5 justify-items-center gap-8 px-72">
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
      <Pagination page={page} total={total} next={next} previous={previous} />
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
