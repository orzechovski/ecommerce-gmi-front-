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
  disabled?: boolean
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
    customerId ?? '',
    {
      query: {
        enabled: !!customerId,
        retry: false
      }
    }
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
      },
      {
        label: 'Orders',
        href: '/orders',
        icon: 'package-check',
        active: pathname.includes('/orders')
      },
      {
        label: 'Admin',
        href: '/admin',
        icon: 'shield',
        disabled: data?.role === 'USER',
        active: pathname.includes('/admin')
      }
    ],
    [pathname, cartCount, data]
  )
  return routes
}

export default useMenuRoutes
