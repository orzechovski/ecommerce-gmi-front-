import { useCartControllerGetCartItemCount } from '@/app/api/generated/cart/cart'
import { IconName } from '@/components/global/Icon'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export type SingleRouteType = {
  label: string
  href: string
  icon: IconName
  count?: number
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
  const { data } = useSession()
  const customerId = data?.id

  const { data: cartCount } = useCartControllerGetCartItemCount(
    customerId ?? ''
  )
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
        active: pathname.includes('/shopcart'),
        count: cartCount
      }
    ],
    [pathname, cartCount]
  )
  return routes
}

export default useMenuRoutes
