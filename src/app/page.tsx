import Menu from '@/components/menu/Menu'
import ProductsList from '@/components/products/ProductsList'

export default function Home() {
  return (
    <Menu containerClassName="p-8">
      <ProductsList />
    </Menu>
  )
}
