'use client'
import { useSession } from 'next-auth/react'
import { useCartControllerGetCart } from '../api/generated/cart/cart'
import Menu from '@/components/menu/Menu'
import Product from './_product/Product'
import CreateOrder from './_product/CreateOrder'
import ProductsSkeleton from './ProductsSkeleton'

const Page = () => {
  const { data } = useSession()
  const { data: cart, isLoading } = useCartControllerGetCart(data?.id ?? '', {
    query: {
      enabled: !!data?.id
    }
  })

  const products = cart?.items.map(({ product, quantity }) => ({
    ...product,
    quantity
  }))

  return (
    <Menu containerClassName="p-8 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-lg">Shopping Cart</h1>
        <CreateOrder />
      </div>
      <ul className={'flex flex-col gap-4 overflow-y-auto h-full flex-grow'}>
        {isLoading ? (
          <ProductsSkeleton />
        ) : products?.length === 0 ? (
          <h5>Your cart is empty 💔</h5>
        ) : (
          products?.map((product, index) => (
            <Product key={index} {...product} />
          ))
        )}
      </ul>
    </Menu>
  )
}

export default Page
