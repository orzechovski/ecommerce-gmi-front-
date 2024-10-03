import NextAuth from 'next-auth'

export interface LoginResposne {
  email: string | null
  role: string
  id: string
  exp: number
  iat: number
}
declare module 'next-auth' {
  interface Session extends LoginResposne {}
}
