import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type LoadingProps = {
   className?: string
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
   return (
      <section className={cn('flex w-full h-full flex-col p-8 gap-8', className)}>
         <Skeleton className="sm:w-96 w-full h-8" />
         <ul className="flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
               <li key={index}>
                  <Skeleton className="w-full h-6" />
               </li>
            ))}
         </ul>
      </section>
   )
}

export default Loading
