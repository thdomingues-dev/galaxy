// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { format } from 'date-fns'

// Api
import api from '../../services/api'

// Components
import RelatedItems from '../../components/related-items'
import DetailField from '../../components/detail-field'

// Models
import { Film } from '../../models/resources'

interface Starships {
  starships: Array<{
    id: string
    name: string
    url: string
  }>
}

interface Characters {
  characters: Array<{
    id: string
    name: string
    url: string
  }>
}

interface Planets {
  planets: Array<{
    id: string
    name: string
    url: string
  }>
}

interface FilmProps {
  film: Omit<Film, 'characters' | 'startships' | 'planets'> & Starships & Characters & Planets
}

const Film = ({ film }: FilmProps): ReactElement => {
  const imgIndex = film.url.split('/').slice(5, -1)
  const formatedDate = format(new Date(film.release_date), 'dd / MM / yyyy')

  return (
    <div className="md:w-4/5 w-full px-4 m-auto">
      <div className="flex flex-col justify-center items-center mt-4">
        <section className="bg-white shadow-lg 2xl:w-3/4 w-full rounded-lg flex justify-start items-center mb-4">
          <Image
            className="rounded-l-lg"
            src={`https://starwars-visualguide.com/assets/img/films/${imgIndex}.jpg`}
            height={250}
            width={175}
            alt={`image${imgIndex}`}
          />
          <div className="ml-4">
            <div className="text-left flex flex-col justify-between">
              <h1 className="text-xl font-bold">{film.title}</h1>
              <DetailField label="Lancamento" value={formatedDate.toString()} />
              <DetailField label="Capítulo" value={film.episode_id.toString()} />
              <DetailField label="Diretor" value={film.director} />
              <DetailField label="Produtor" value={film.producer} />
            </div>
          </div>
        </section>

        <RelatedItems title="Personagens" resource="characters" items={film.characters} hasLink />
        <RelatedItems title="Naves Espaciais" resource="starships" items={film.starships} />
        <RelatedItems title="Planetas" resource="planets" items={film.planets} hasLink />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('films')

  const paths = data.results.map((_film: any, index: number) => {
    return { params: { slug: (index + 1).toString() } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params || { slug: undefined }

  const { data: film } = await api.get(`/films/${slug}`).catch(() => ({ data: null }))

  const starshipsIndex: Array<string> = film.starships.map((starship: string) => starship.split('/').slice(5, -1))
  const starships = await Promise.all(
    starshipsIndex.map(async starshipId => {
      const { data: starship } = await api.get(`/starships/${starshipId}`)
      const starshipIndex = starship.url.split('/').slice(5, -1)[0]

      return { id: starshipIndex, name: starship.name, url: starship.url }
    }),
  )

  const charactersIndex: Array<string> = film.characters.map((character: string) => character.split('/').slice(5, -1))
  const characters = await Promise.all(
    charactersIndex.map(async characterId => {
      const { data: character } = await api.get(`/people/${characterId}`)
      const characterIndex = character.url.split('/').slice(5, -1)[0]

      return { id: characterIndex, name: character.name, url: character.url }
    }),
  )

  const planetsIndex: Array<string> = film.planets.map((planet: string) => planet.split('/').slice(5, -1))
  const planets = await Promise.all(
    planetsIndex.map(async planetId => {
      const { data: planet } = await api.get(`/planets/${planetId}`)
      const planetIndex = planet.url.split('/').slice(5, -1)[0]

      return { id: planetIndex, name: planet.name, url: planet.url }
    }),
  )

  return {
    props: {
      film: {
        ...film,
        starships,
        characters,
        planets,
      },
    },
    revalidate: 60 * 60 * 12,
  }
}

export default Film
