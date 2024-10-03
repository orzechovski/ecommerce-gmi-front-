import { Metadata } from 'next'

type LayoutProps = {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Sign up - gmi',
  description: 'Register to gmi shop'
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex items-center justify-center h-full">{children}</main>
  )
}

export default Layout
