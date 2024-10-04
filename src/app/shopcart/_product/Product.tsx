import Icon from '@/components/global/Icon'
import { cn } from '@/lib/utils'
import { ProductDto } from '../../api/generated/eCommerceGMIAPI.schemas'
import Tag from './Tag'
import { Button } from '@/components/ui/button'
import AddToCart from './AddToCart'
import RemoveFromCart from './RemoveFromCart'

type ProductProps = {
  className?: string
  quantity: number
} & ProductDto

const Product: React.FC<ProductProps> = ({
  className,
  title,
  description,
  price,
  status,
  quantity,
  id
}) => {
  return (
    <li
      className={cn(
        'border border-border/30 dark:border-border rounded-xl p-3 bg-gray-100 dark:bg-background flex gap-3 w-full',
        className
      )}
    >
      <div className="dark:bg-primary/70 bg-primary/20 flex items-center justify-center h-full aspect-square rounded-lg">
        <Icon name="shopping-basket" size={30} />
      </div>

      <div className="flex w-full sm:flex-row flex-col">
        <div className="text-sm p-1 flex flex-col items-stretch">
          {status && <Tag text={status} />}
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-muted-foreground hidden sm:block">{description}</p>
        </div>
        <div className="flex-grow flex flex-col items-end text-sm gap-1">
          <div className="flex items-center flex-grow w-full justify-between">
            <p className="text-muted-foreground">
              {quantity} x {price} $
            </p>
            <p>
              <span className="font-semibold">Total:</span>{' '}
              <span className="font-medium">
                {(quantity * price).toFixed(2)} $
              </span>
            </p>
          </div>
          <div className="items-center gap-2 w-full sm:w-auto grid grid-cols-2">
            <AddToCart productId={id} />
            <RemoveFromCart productId={id} />
          </div>
        </div>
      </div>
    </li>
  )
}

export default Product
