import { Metadata } from 'next'

type LayoutProps = {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin Dashboard'
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default Layout
