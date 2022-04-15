import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
          <MenuItem title='Personagens' imgSrc='https://starwars-visualguide.com/assets/img/categories/character.jpg' />
          <MenuItem title='Planetas' imgSrc='https://starwars-visualguide.com/assets/img/categories/planets.jpg' />
          <MenuItem title='Filmes' imgSrc='https://starwars-visualguide.com/assets/img/categories/films.jpg' />
        </div>
      </section>
    </div>
  )
}

export default Home
