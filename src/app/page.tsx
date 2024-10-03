import Menu from '@/components/menu/Menu'
import ProductsList from '@/components/products/ProductsList'

export default function Home() {
  return (
    <Menu containerClassName="p-8 flex flex-col gap-4">
      <h1 className="text-lg">Product List</h1>
      <ProductsList />
    </Menu>
  )
}
