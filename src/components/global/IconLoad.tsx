import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import Loader from './Loader'
import { Motion } from './Motion'

type IconLoadProps = {
  className?: string
  isLoading: boolean
  children?: React.ReactNode
  iconSize?: number
}

const IconLoad: React.FC<IconLoadProps> = ({
  className,
  isLoading,
  children,
  iconSize = 18
}) => {
  return (
    <AnimatePresence mode="wait">
      <Motion
        key={isLoading ? 'loader' : 'content'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
      >
        {isLoading ? (
          <Loader className={cn('text-white', className)} size={iconSize} />
        ) : (
          children
        )}
      </Motion>
    </AnimatePresence>
  )
}

export default IconLoad
