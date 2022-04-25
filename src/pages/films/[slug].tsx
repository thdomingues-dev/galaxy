// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'

// Api
import api from '../../services/api'

// Components
import { Pagination, ListItem } from '../../components'

interface Film {
  characters: Array<string>
  created: string
  director: string
  edited: string
  episode_id: number
  opening_crawl: string
  planets: Array<string>
  producer: string
  release_date: string
  species: Array<string>
  starships: Array<string>
  title: string
  url: string
  vehicles: Array<string>
}

interface FilmsProps {
  page: number
  total: number
  next: string | null
  previous: string | null
  films: Array<Film>
}

const Films = ({ films, page, total, next, previous }: FilmsProps): ReactElement => (
  <>
    <Head>
      <title>Galaxypedia | Filmes</title>
    </Head>
    <div className=" flex flex-col justify-center text-center">
      <h1 className="text-xl md:text-2xl text-gray-600 mb-2">Filmes</h1>
      <ul className="w-4/5 m-auto py-4 grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-4 xl:grid-cols-5 xl:gap-8 xl:px-40">
        {films.map((film, index) => {
          const filmIndex = film.url.split('/').slice(5, -1)[0]

          return (
            <li key={index} className="w-full rounded-lg">
              <ListItem
                title={film.title}
                link={filmIndex}
                referece="films"
                referenceId={filmIndex}
                altMessage={film.title}
              />
            </li>
          )
        })}
      </ul>
    </div>
    <Pagination resource="films" page={page} total={total} next={next} previous={previous} />
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('films')

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
  const { data } = await api.get(`films/?page=${slug}`)

  return {
    props: {
      page: Number(slug),
      total: data.count,
      next: data.next,
      previous: data.previous,
      films: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Films
