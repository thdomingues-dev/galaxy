// Packages
import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

// Api
import api from '../../services/api'

// Components
import { Pagination, ListItem } from '../../components'

// Models
import { Character } from '../../models/resources'

interface CharactersProps {
  page: number
  total: number
  next: string | null
  previous: string | null
  characters: Array<Character>
}

const Characters = ({ characters, page, total, next, previous }: CharactersProps): ReactElement => (
  <>
    <Head>
      <title>Galaxypedia | Personagens</title>
    </Head>
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-xl md:text-2xl text-gray-600 mb-2">Personagens</h1>
      <ul className="w-4/5 m-auto py-4 grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-4 xl:grid-cols-5 xl:gap-8 xl:px-40">
        {characters.map((character, index) => {
          const characterIndex = character.url.split('/').slice(5, -1)[0]

          return (
            <li key={index} className="w-full rounded-lg">
              <ListItem
                title={character.name}
                link={characterIndex}
                referece="characters"
                referenceId={characterIndex}
                altMessage={`character ${character.name}`}
              />
            </li>
          )
        })}
      </ul>
    </div>
    <Pagination resource="characters" isServerSide page={page} total={total} next={next} previous={previous} />
  </>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const { page } = context.query || { page: 1 }
  const { data } = await api.get(`people/?page=${page}`)

  return {
    props: {
      page: Number(page),
      total: data.count,
      next: data.next,
      previous: data.previous,
      characters: data.results,
    },
  }
}

export default Characters
