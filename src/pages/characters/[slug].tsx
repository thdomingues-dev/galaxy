// Packages
import { ReactElement } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

// Api
import api from "../../services/api";

const Character = (props: any): ReactElement => {
  console.log(props)

  return <div>Character page</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('people')

  const paths = data.results.map((_character: any, index: number) => {
    return { params: { slug: (index + 1).toString() }}
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params || { slug: undefined }

  const { data } = await api.get(`/people/${slug}`).catch(() => ({ data: null}))

  return {
    props: {
      character: data,
    },
    revalidate: 60 * 60 * 12,
  }
}

export default Character
