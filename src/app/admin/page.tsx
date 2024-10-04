'use client'

import Menu from '@/components/menu/Menu'
import { useProductsControllerFindAll } from '../api/generated/products/products'
import { ProductsTable } from './_table/Table'

const Page = () => {
  const { data: products } = useProductsControllerFindAll()
  return (
    <Menu containerClassName="p-8 flex flex-col gap-4">
      <ProductsTable data={products ?? []} />
    </Menu>
  )
}

export default Page
