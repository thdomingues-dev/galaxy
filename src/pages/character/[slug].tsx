// Packages
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

// Api
import api from '../../services/api'

// Models
import { Character } from '../characters/[slug]'

type HomeworldName = { homeworldName: string }

interface Films {
  films: Array<{
    id: string
    title: string
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

  return (
    <div className="w-4/5 m-auto">
      <div className="h-screen flex flex-col justify-center items-center">
        <section className="bg-white w-3/4 rounded-lg flex justify-start items-center mb-8">
          <Image
            className="rounded-lg"
            src={`https://starwars-visualguide.com/assets/img/characters/${imgIndex}.jpg`}
            height={300}
            width={225}
            alt={`image${imgIndex}`}
          />
          <div className="ml-4">
            <ul className="text-left">
              <li className="text-lg font-bold">{character.name}</li>
              <li>Cidade natal: {character.homeworldName}</li>
              <li>Aniversário: {character.birth_year}</li>
              <li>Espécie: {(character.species.length && character.species) || 'N/A'}</li>
              <li>Altura: {character.height} cm</li>
              <li>Peso: {character.mass} kg</li>
              <li>Gênero: {character.gender}</li>
              <li>Cor do cabelo: {character.hair_color}</li>
              <li>Cor de pele: {character.skin_color}</li>
            </ul>
          </div>
        </section>

        <section className="bg-white w-3/4 rounded-lg flex justify-start items-center  mb-8">
          <div className="p-4">
            <span className="text-lg font-bold">Filmes</span>
            <ul className="text-left flex">
              {character.films.map((film, index) => (
                <li key={index}>
                  <Image
                    className="rounded-full"
                    src={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`}
                    height={64}
                    width={64}
                    alt={film.title}
                  />
                  {film.title}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white w-3/4 rounded-lg flex justify-start items-center  mb-8">
          <div className="p-4">
            <span className="text-lg font-bold">Naves Espaciais</span>
            <ul className="text-left flex">
              {character.starships.map((starship, index) => (
                <li key={index}>
                  <Image
                    className="rounded-full"
                    src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
                    height={64}
                    width={64}
                    alt={starship.name}
                  />
                  {starship.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white w-3/4 rounded-lg flex justify-start items-center  mb-8">
          <div className="p-4">
            <span className="text-lg font-bold">Veículos</span>
            <ul className="text-left flex">
              {character.vehicles.map((vehicle, index) => (
                <li key={index}>
                  <Image
                    className="rounded-full"
                    src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.id}.jpg`}
                    height={64}
                    width={64}
                    alt={vehicle.name}
                  />
                  {vehicle.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
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

  const planetIndex: string = character.homeworld.split('/').slice(5, -1)
  const { data: planet } = await api.get(`/planets/${planetIndex}`)

  const filmsIndex: Array<string> = character.films.map((film: string) => film.split('/').slice(5, -1))
  const films = await Promise.all(
    filmsIndex.map(async filmId => {
      const { data: film } = await api.get(`/films/${filmId}`)
      const filmIndex = film.url.split('/').slice(5, -1)[0]

      return { id: filmIndex, title: film.title, url: film.url }
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
