import { cn } from '@/lib/utils'
import IconLoad from '@/components/global/IconLoad'
import { Button } from '@/components/ui/button'
import useInvalidate from '@/hooks/useInvalidate'
import { Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {
  getCartControllerGetCartQueryKey,
  useCartControllerRemoveFromCart
} from '@/app/api/generated/cart/cart'
type RemoveFromCartProps = {
  className?: string
  productId: string
}

const RemoveFromCart: React.FC<RemoveFromCartProps> = ({
  className,
  productId
}) => {
  const invalidate = useInvalidate()

  const { data } = useSession()
  const customerId = data?.id ?? ''
  const queryKeys = [...getCartControllerGetCartQueryKey(customerId)]
  const { mutate, isPending } = useCartControllerRemoveFromCart()

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
      variant="outline"
      size="sm"
      type="button"
      className={cn('flex items-center gap-2', className)}
    >
      Remove
      <IconLoad
        isLoading={isPending}
        iconSize={16}
        className="text-black dark:text-white"
      >
        <Trash2 size={16} />
      </IconLoad>
    </Button>
  )
}

export default RemoveFromCart
