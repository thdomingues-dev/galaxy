import type { NextPage } from 'next'
import Head from 'next/head'

// Components
import MenuItem from '../components/menu/menu-item'
import Menu from '../components/menu/menu'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center text-center">
      <Head>
        <title>Galaxypedia</title>
      </Head>
      <h1 className="text-3xl font-bold mb-2">Galaxypedia</h1>
      <span>Tudo sobre o mundo de starwars está aqui.</span>
      <Menu>
        <MenuItem
          title="Personagens"
          imgSrc="https://starwars-visualguide.com/assets/img/categories/character.jpg"
          linkPath="/characters/1"
        />

        <MenuItem
          title="Planetas"
          imgSrc="https://starwars-visualguide.com/assets/img/categories/planets.jpg"
          linkPath="/planets/1"
        />

        <MenuItem
          title="Filmes"
          imgSrc="https://starwars-visualguide.com/assets/img/categories/films.jpg"
          linkPath="/films/1"
        />
      </Menu>
    </div>
  )
}

export default Home
