import {
  getCartControllerGetCartQueryKey,
  useCartControllerAddToCart
} from '@/app/api/generated/cart/cart'
import IconLoad from '@/components/global/IconLoad'
import { Button } from '@/components/ui/button'
import useInvalidate from '@/hooks/useInvalidate'
import { cn } from '@/lib/utils'
import { SquarePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

type AddToCartProps = {
  className?: string
  productId: string
}

const AddToCart: React.FC<AddToCartProps> = ({ className, productId }) => {
  const invalidate = useInvalidate()

  const { data } = useSession()
  const customerId = data?.id ?? ''
  const queryKeys = [...getCartControllerGetCartQueryKey(customerId)]
  const { mutate, isPending } = useCartControllerAddToCart()
  const handleClick = () => {
    customerId &&
      mutate(
        {
          data: {
            customerId,
            productId,
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
      variant="secondary"
      size="sm"
      type="button"
      className={cn('flex items-center gap-2', className)}
    >
      Add{' '}
      <IconLoad
        isLoading={isPending}
        iconSize={16}
        className="text-black dark:text-white"
      >
        <SquarePlus size={16} />
      </IconLoad>
    </Button>
  )
}

export default AddToCart
