// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

// Configs
import { translate } from '../../configs/translate'

// Api
import api from '../../services/api'

// Models
import { Character } from '../characters'

// Components
import { RelatedItems, DetailField } from '../../components'

type HomeworldName = { homeworldName: string }

interface Films {
  films: Array<{
    id: string
    name: string
    url: string
  }>
}

interface Starships {
  starships: Array<{
    id: string
    name: string
    url: string
  }>
}

interface Vehicles {
  vehicles: Array<{
    id: string
    name: string
    url: string
  }>
}

interface CharacterProps {
  character: Omit<Character, 'films' | 'starships' | 'vehicles'> & HomeworldName & Films & Vehicles & Starships
}

const Character = ({ character }: CharacterProps): ReactElement => {
  const imgIndex = character.url.split('/').slice(5, -1)
  const planetId = character.homeworld.split('/').slice(5, -1)[0]

  return (
    <div className="md:w-4/5 w-full px-4 m-auto">
      <div className="flex flex-col justify-center items-center mt-4">
        <section className="bg-white shadow-lg 2xl:w-3/4 w-full rounded-lg flex justify-start items-center mb-4">
          <Image
            className="rounded-l-lg"
            src={`https://starwars-visualguide.com/assets/img/characters/${imgIndex}.jpg`}
            height={250}
            width={175}
            alt={`image${imgIndex}`}
          />
          <div className="ml-4">
            <div className="text-left flex flex-col justify-between">
              <h1 className="text-xl font-bold">{character.name}</h1>
              <DetailField label="Cidade Natal" value={character.homeworldName} link={`/planet/${planetId}`} />
              <DetailField label="Aniversário" value={character.birth_year} />
              <DetailField label="Espécie" value={(character.species.length && character.species[0]) || 'n/a'} />
              <DetailField label="Altura" value={`${character.height} cm`} />
              <DetailField label="Peso" value={`${character.mass} kg`} />
              <DetailField label="Gênero" value={translate(character.gender)} />
              <DetailField label="Cor do Cabelo" value={translate(character.hair_color)} />
              <DetailField label="Cor de Pele" value={translate(character.skin_color)} />
            </div>
          </div>
        </section>

        <RelatedItems title="Filmes" resource="films" items={character.films} hasLink />
        <RelatedItems title="Naves Espaciais" resource="starships" items={character.starships} />
        <RelatedItems title="Veículos" resource="vehicles" items={character.vehicles} />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('people')

  const paths = data.results.map((_character: any, index: number) => {
    return { params: { slug: (index + 1).toString() } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params || { slug: undefined }

  const { data: character } = await api.get(`/people/${slug}`).catch(() => ({ data: null }))

  const planetIndex: string = character.homeworld.split('/').slice(5, -1)[0]
  const { data: planet } = await api.get(`/planets/${planetIndex}`)

  const filmsIndex: Array<string> = character.films.map((film: string) => film.split('/').slice(5, -1))
  const films = await Promise.all(
    filmsIndex.map(async filmId => {
      const { data: film } = await api.get(`/films/${filmId}`)
      const filmIndex = film.url.split('/').slice(5, -1)[0]

      return { id: filmIndex, name: film.title, url: film.url }
    }),
  )

  const starshipsIndex: Array<string> = character.starships.map((starship: string) => starship.split('/').slice(5, -1))
  const starships = await Promise.all(
    starshipsIndex.map(async starshipId => {
      const { data: starship } = await api.get(`/starships/${starshipId}`)
      const starshipIndex = starship.url.split('/').slice(5, -1)[0]

      return { id: starshipIndex, name: starship.name, url: starship.url }
    }),
  )

  const vehiclesIndex: Array<string> = character.vehicles.map((vehicle: string) => vehicle.split('/').slice(5, -1))
  const vehicles = await Promise.all(
    vehiclesIndex.map(async vehiclesId => {
      const { data: vehicle } = await api.get(`/vehicles/${vehiclesId}`)
      const vehiclesIndex = vehicle.url.split('/').slice(5, -1)[0]

      return { id: vehiclesIndex, name: vehicle.name, url: vehicle.url }
    }),
  )

  return {
    props: {
      character: {
        ...character,
        homeworldName: planet.name,
        films,
        starships,
        vehicles,
      },
    },
    revalidate: 60 * 60 * 12,
  }
}

export default Character
