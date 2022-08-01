import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // authorization: {
      //   params: { scope: 'read:user', redirect_uri: process.env.GITHUB_REDIRECT_URI }
      // }
    })
  ]
})
