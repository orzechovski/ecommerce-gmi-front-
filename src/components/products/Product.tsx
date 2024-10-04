import { cn } from '@/lib/utils'
import Icon from '../global/Icon'
import AddToCartButton from './AddToCartButton'
import { ProductDto } from '@/app/api/generated/eCommerceGMIAPI.schemas'

type ProductPropsType = {
  className?: string
} & ProductDto

const Product: React.FC<ProductPropsType> = ({
  className,
  price,
  stock,
  title,
  id
}) => {
  return (
    <li
      className={cn(
        'border border-border/30 dark:border-border rounded-xl p-3 min-w-40 flex-grow bg-gray-100 dark:bg-background flex flex-col gap-1 max-w-44 max-h-72',
        className
      )}
    >
      <div className="dark:bg-primary/70 bg-primary/20 flex items-center justify-center w-full aspect-square rounded-lg">
        <Icon name="shopping-basket" size={30} />
      </div>

      <div className="text-sm p-1 flex flex-col mt-auto">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">Stock: {stock}</p>
        <div className="mt-2 flex item-end justify-between">
          <p className="font-semibold mt-2"> {price} $</p>
          <AddToCartButton id={id} />
        </div>
      </div>
    </li>
  )
}

export default Product
