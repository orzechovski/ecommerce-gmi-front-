import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../global/Logo'

type MenuLogoProps = {
  className?: string
  open?: boolean
}

const MenuLogo: React.FC<MenuLogoProps> = ({ className, open }) => {
  return (
    <Link
      href="/"
      className={cn(
        'font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20 px-2',
        className
      )}
    >
      <Logo className="min-w-8 min-h-8" />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          GMI shop
        </motion.span>
      )}
    </Link>
  )
}

export default MenuLogo
