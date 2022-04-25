export type Resource = 'characters' | 'planets' | 'films' | 'vehicles' | 'startships'

export interface Film {
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

export interface Character {
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
