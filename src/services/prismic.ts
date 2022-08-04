import * as Prismic from '@prismicio/client'

export function getPrismicClient() {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })
}
