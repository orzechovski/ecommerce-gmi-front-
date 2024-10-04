import { Metadata } from 'next'

type LayoutProps = {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Shop cart',
  description: 'Shop cart gmi'
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default Layout
