// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

// Api
import api from '../../services/api'

// Components
import Pagination from '../../components/pagination'
import ListItem from '../../components/list-item'

export type Character = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: Array<string>
  species: Array<string>
  vehicles: Array<string>
  starships: Array<string>
  created: string
  edited: string
  url: string
}

interface CharactersProps {
  page: number
  total: number
  next: string | null
  previous: string | null
  characters: Array<Character>
}

const Characters = ({ characters, page, total, next, previous }: CharactersProps): ReactElement => (
  <>
    <div className=" flex flex-col justify-center text-center pt-16">
      <ul className="grid grid-cols-5 justify-items-center gap-8 px-72">
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
    <Pagination page={page} total={total} next={next} previous={previous} />
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('people')

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
  const { data } = await api.get(`people/?page=${slug}`)

  return {
    props: {
      page: Number(slug),
      total: data.count,
      next: data.next,
      previous: data.previous,
      characters: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Characters
