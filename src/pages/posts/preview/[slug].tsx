import styles from '../post.module.scss'
import {GetStaticPaths, GetStaticProps} from 'next'
import { getPrismicClient } from '../../../services/prismic'
import { asHTML, asText } from '@prismicio/helpers'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface IPostPost {
  post: {
    slug: string
    title: string
    content: string
    updated: string
  }
}

export default function Post({ post }: IPostPost) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.activeSubscription) {
      ;(async () => await router.push(`/posts/preview/${post.slug}`))()
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updated}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={'/'}>
              <a>Subscribe now 😁</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 1
  })

  const { data } = response
  const post = {
    slug,
    title: asText(data.title),
    content: asHTML(data.content.splice(0, 2)),
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
    },
    revalidate: 60 * 30
  }
}
