import type { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'
import { authControllerLogin } from '../../generated/auth/auth'
import { LoginResposne } from '../../../../../types/next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          throw new Error('Missing credentials')
        }
        const { password, email } = credentials

        if (!password || !email) {
          throw new Error('Missing credentials')
        }

        try {
          const res = await authControllerLogin({ email, password })

          if (!res?.access_token) {
            throw new Error('Wrong email or password')
          }
          const decodedData = jwtDecode<LoginResposne>(res?.access_token)
          return {
            ...decodedData,
            accessToken: res?.access_token
          }
        } catch (error) {
          console.error(error)
          throw new Error('Wrong email or password')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const data = { ...token, ...user }

      return data
    },
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        ...token
      }
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',

  secret: process.env.NEXTAUTH_SECRET
}
