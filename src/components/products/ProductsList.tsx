import { CreateProductDto } from '@/app/api/generated/eCommerceGMIAPI.schemas'
import { productsControllerFindAll } from '@/app/api/generated/products/products'
import { cn } from '@/lib/utils'
import Product from './Product'

type ProductsListProps = {
  className?: string
}

const ProductsList: React.FC<ProductsListProps> = async ({ className }) => {
  const data = await productsControllerFindAll()
  const resposne = data as unknown as CreateProductDto[] | null
  if (!resposne) return null

  return (
    <ul
      className={cn('flex flex-wrap gap-4 overflow-y-auto h-full', className)}
    >
      {resposne?.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </ul>
  )
}

export default ProductsList
