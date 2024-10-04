import { Metadata } from 'next'

type LayoutProps = {
  children?: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Your Orders in gmi shop'
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default Layout
