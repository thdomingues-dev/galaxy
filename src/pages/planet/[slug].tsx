// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

// Components
import { RelatedItems, DetailField } from '../../components'

// Api
import api from '../../services/api'

// Models
import { Planet } from '../planets/[slug]'

// Configs
import { translate } from '../../configs/translate'

interface Films {
  films: Array<{
    id: string
    name: string
    url: string
  }>
}

interface Residents {
  residents: Array<{
    id: string
    name: string
    url: string
  }>
}

interface PlanetProps {
  planet: Omit<Planet, 'films' | 'residents'> & Films & Residents
}

const Planet = ({ planet }: PlanetProps): ReactElement => {
  const imgIndex = planet.url.split('/').slice(5, -1)
  const population = Number(planet.population).toLocaleString('pt-BR')
  const diameter = Number(planet.diameter).toLocaleString('pt-BR')

  return (
    <div className="md:w-4/5 w-full px-4 m-auto">
      <div className="flex flex-col justify-center items-center mt-4">
        <section className="bg-white shadow-lg 2xl:w-3/4 w-full rounded-lg flex justify-start items-center mb-4">
          <Image
            className="rounded-l-lg"
            src={`https://starwars-visualguide.com/assets/img/planets/${imgIndex}.jpg`}
            height={250}
            width={175}
            alt={`image${imgIndex}`}
          />
          <div className="ml-4">
            <div className="text-left flex flex-col justify-between">
              <h1 className="text-xl font-bold">{planet.name}</h1>
              <DetailField label="Populacão" value={population} />
              <DetailField label="Período rotacão" value={`${planet.rotation_period} dias`} />
              <DetailField label="Período orbital" value={`${planet.orbital_period} dias`} />
              <DetailField label="Diâmetro" value={`${diameter} Km`} />
              <DetailField label="Gravidade" value={planet.gravity} />
              <DetailField label="Terreno" value={translate(planet.terrain)} />
              <DetailField label="Superfície de água" value={`${planet.surface_water}%`} />
              <DetailField label="Clima" value={translate(planet.climate)} />
            </div>
          </div>
        </section>

        <RelatedItems title="Filmes" resource="films" items={planet.films} hasLink />
        <RelatedItems title="Moradores" resource="characters" items={planet.residents} hasLink />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('planets')

  const paths = data.results.map((_planet: any, index: number) => {
    return { params: { slug: (index + 1).toString() } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params || { slug: undefined }

  const { data: planet } = await api.get(`/planets/${slug}`).catch(() => ({ data: null }))

  const filmsIndex: Array<string> = planet.films.map((film: string) => film.split('/').slice(5, -1))
  const films = await Promise.all(
    filmsIndex.map(async filmId => {
      const { data: film } = await api.get(`/films/${filmId}`)
      const filmIndex = film.url.split('/').slice(5, -1)[0]

      return { id: filmIndex, name: film.title, url: film.url }
    }),
  )

  const residentsIndex: Array<string> = planet.residents.map((resident: string) => resident.split('/').slice(5, -1))
  const residents = await Promise.all(
    residentsIndex.map(async residentId => {
      const { data: resident } = await api.get(`/people/${residentId}`)
      const residentIndex = resident.url.split('/').slice(5, -1)[0]

      return { id: residentIndex, name: resident.name, url: resident.url }
    }),
  )

  return {
    props: {
      planet: {
        ...planet,
        films,
        residents,
      },
    },
    revalidate: 60 * 60 * 12,
  }
}

export default Planet
