import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
type LoaderProps = {
   className?: string
   size?: number
   strokeWidth?: number
}

const Loader: React.FC<LoaderProps> = ({ className, size, strokeWidth }) => {
   return <Loader2 strokeWidth={strokeWidth} size={size} className={cn('animate-spin text-primary', className)} />
}

export default Loader
