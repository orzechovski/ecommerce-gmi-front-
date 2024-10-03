import { cn } from '@/lib/utils'
import Image from 'next/image'
import favicon from '@/app/favicon.ico'

const Logo = ({ className }: { className?: string }) => {
   return <Image src={favicon} className={cn('w-8 h-8', className)} alt="Assel logo" />
}

export default Logo
