import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type ProductsSkeletonProps = {
  className?: string
}

const ProductsSkeleton: React.FC<ProductsSkeletonProps> = ({ className }) => {
  const skeletons = Array.from({ length: 4 }, (_, i) => (
    <Skeleton key={i} className={cn('w-full h-32')} />
  ))

  return <ul className={cn('flex flex-col gap-4', className)}>{skeletons}</ul>
}

export default ProductsSkeleton
