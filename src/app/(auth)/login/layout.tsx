import { Metadata } from 'next'

type LayoutProps = {
   children?: React.ReactNode
}

export const metadata: Metadata = {
   title: 'Login - gmi',
   description: 'Login to gmi shop',
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return <main className="flex items-center justify-center h-full">{children}</main>
}

export default Layout
