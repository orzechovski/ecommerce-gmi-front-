'use client'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import {
  getCartControllerGetCartItemCountQueryKey,
  useCartControllerAddToCart
} from '@/app/api/generated/cart/cart'
import { useSession } from 'next-auth/react'
import IconLoad from '../global/IconLoad'
import { toast } from 'sonner'
import { ShoppingCart } from 'lucide-react'
import useInvalidate from '@/hooks/useInvalidate'

type AddToCartButtonProps = {
  className?: string
  id: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ className, id }) => {
  const invalidate = useInvalidate()
  const { data } = useSession()
  const customerId = data?.id ?? ''
  const { mutate, isPending } = useCartControllerAddToCart()
  const queryKeys = [...getCartControllerGetCartItemCountQueryKey(customerId)]

  const handleClick = () => {
    customerId &&
      mutate(
        {
          data: {
            customerId,
            productId: id,
            quantity: 1
          }
        },

        {
          onSuccess: () => {
            toast.success('Product added to cart')
            invalidate(queryKeys)
          },
          onError: (error: any) => {
            toast.error(error.message || 'An error occurred')
          }
        }
      )
  }
  return (
    <Button
      onClick={handleClick}
      type="button"
      size="sm"
      className={cn(className)}
    >
      <IconLoad isLoading={isPending}>
        <ShoppingCart size={18} />
      </IconLoad>
    </Button>
  )
}

export default AddToCartButton
