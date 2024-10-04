import Menu from '@/components/menu/Menu'
import { productsControllerFindAll } from './api/generated/products/products'
import Product from '@/components/products/Product'

export default async function Home() {
  const data = await productsControllerFindAll()
  if (!data) return null

  return (
    <Menu containerClassName="p-8 flex flex-col gap-4">
      <h1 className="text-lg">Product List</h1>
      <ul className={'flex flex-wrap gap-4 overflow-y-auto h-full flex-grow'}>
        {data?.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </ul>
    </Menu>
  )
}
