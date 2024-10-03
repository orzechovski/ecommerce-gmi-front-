'use client'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Icon from '../global/Icon'
import CountdownTimer from '../global/CountDowntTimer'

type UserProps = {
  className?: string
  open?: boolean
}

const User: React.FC<UserProps> = ({ className, open }) => {
  const { data } = useSession() as { data: any }
  return (
    <section
      className={cn(
        'font-normal flex flex-col gap-3 text-sm text-black py-1 relative z-20 px-3',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="dark:text-white">
          <Icon name="user" className="min-w-6" />
        </div>
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground whitespace-pre"
          >
            {data?.user.email}
          </motion.span>
        )}
      </div>
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground whitespace-pre flex justify-center items-center"
        >
          <div className="flex items-center gap-1">
            <p>Czas sesji:</p>

            <CountdownTimer className="font-semibold" exp={data.exp} />
          </div>
        </motion.span>
      )}
    </section>
  )
}

export default User
