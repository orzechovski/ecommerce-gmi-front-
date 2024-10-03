import { IconName } from '@/components/global/Icon'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export type SingleRouteType = {
  label: string
  href: string
  icon: IconName
  active?: boolean
  onClick?: () => void
}

export type MenuRoutesType = {
  label: string
  href: string
  icon: IconName
  active?: boolean
  onClick?: () => void
  items?: SingleRouteType[]
}

export const useMenuRoutes = () => {
  const pathname = usePathname()

  const routes: MenuRoutesType[] = useMemo(
    () => [
      {
        label: 'Products',
        href: '/',
        icon: 'app-window',
        active: pathname === '/'
      },
      {
        label: 'Shop cart',
        href: '/shopcart',
        icon: 'shopping-cart',
        active: pathname.includes('/shopcart')
      }
    ],
    [pathname]
  )
  return routes
}

export default useMenuRoutes
