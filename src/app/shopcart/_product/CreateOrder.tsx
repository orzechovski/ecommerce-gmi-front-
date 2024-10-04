import { useOrdersControllerCreateOrder } from '@/app/api/generated/orders/orders'
import IconLoad from '@/components/global/IconLoad'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PackageCheck } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type CreateOrderProps = {
  className?: string
}

const CreateOrder: React.FC<CreateOrderProps> = ({ className }) => {
  const { push } = useRouter()
  const { data } = useSession()
  const { mutate, isPending } = useOrdersControllerCreateOrder()

  const handleClick = () => {
    data?.id &&
      mutate(
        {
          data: {
            customerId: data?.id
          }
        },
        {
          onSuccess: () => {
            toast.success('Order created')
            push('/orders')
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
      className={cn('flex items-center gap-2', className)}
      type="button"
    >
      Create Order
      <IconLoad isLoading={isPending}>
        <PackageCheck size={18} />
      </IconLoad>
    </Button>
  )
}

export default CreateOrder
