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
