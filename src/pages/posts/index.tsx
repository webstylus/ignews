import styles from './styles.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import { asText } from '@prismicio/helpers'
import Link from 'next/link'

interface IPost {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface IPostProps {
  posts: IPost[]
}

export default function Posts({ posts }: IPostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getByType('post', {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 10
  })
  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
  })

  return {
    props: {
      posts
    }
  }
}
