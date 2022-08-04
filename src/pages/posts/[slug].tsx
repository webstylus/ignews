import styles from './post.module.scss'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { getPrismicClient } from '../../services/prismic'
import { asHTML, asText } from '@prismicio/helpers'
import Head from 'next/head'

interface IPostPost {
  post: {
    slug: string
    title: string
    content: string
    updated: string
  }
}

export default function Post({ post }: IPostPost) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updated}</time>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const session = await getSession({ req })

  const { slug } = params
  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 10
  })

  const { data } = response
  const post = {
    slug,
    title: asText(data.title),
    content: asHTML(data.content),
    updated: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )
  }

  return {
    props: {
      post
    }
  }
}
