// Packages
import { ReactElement } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

// Api
import api from '../../services/api'

const Films = (props: any): ReactElement => {
  console.log(props)

  return <div>Films page</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('films')

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
  const { data } = await api.get(`films/?page=${slug}`)

  return {
    props: {
      page: Number(slug),
      total: data.count,
      next: data.next,
      previous: data.previous,
      films: data.results,
    },
    revalidate: 60 * 60,
  }
}

export default Films
