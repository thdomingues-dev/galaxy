import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

// Components
import MenuItem from '../components/menu-item'

const Home: NextPage = () => {

  return (
    <div className='h-screen flex flex-col justify-center text-center'>
      <Head>
        <title>Galaxypedia</title>
      </Head>
      <h1 className='text-3xl font-bold mb-16'>
        Galaxypedia
      </h1>
      <section className='px-80'>
        <div className='grid grid-cols-3'>
          <Link href="/characters" passHref>
            <MenuItem title='Personagens' imgSrc='https://starwars-visualguide.com/assets/img/categories/character.jpg' />
          </Link>
            <MenuItem title='Planetas' imgSrc='https://starwars-visualguide.com/assets/img/categories/planets.jpg' />
            <MenuItem title='Filmes' imgSrc='https://starwars-visualguide.com/assets/img/categories/films.jpg' />
        </div>
      </section>
    </div>
  )
}

export default Home
