// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

// Api
import api from '../../services/api'

const Planets = (props: any): ReactElement => {
  console.log(props)
  return <div>Planets page</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('planets')

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
  const { data } = await api.get(`planets/?page=${slug}`)

  return {
    props: {
      page: slug,
      total: data.count,
      next: data.next,
      previous: data.previous,
      planets: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Planets
