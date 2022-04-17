// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// Api
import api from '../../services/api'

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

const Characters = ({ characters }: CharactersProps): ReactElement => {
  return (
    <div className=" flex flex-col justify-center text-center">
      <ul className="grid grid-cols-5 justify-items-center gap-4 px-60">
        {characters.map((character, index) => {
          const characterIndex = character.url.split('/').slice(5, -1)

          return (
            <li key={index} className="bg-white w-fit">
              <Link href={`/character/${characterIndex}`}>
                <a className="flex flex-col">
                  <Image
                    className="rounded-t-lg"
                    src={`https://starwars-visualguide.com/assets/img/characters/${characterIndex}.jpg`}
                    height={300}
                    width={225}
                    alt={`image${index}`}
                  />
                  <span className="bg-black text-yellow-400 rounded-b-lg">{character.name}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

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
      page: slug,
      total: data.count,
      next: data.next,
      previous: data.previous,
      characters: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Characters
