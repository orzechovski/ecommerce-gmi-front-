'use client'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Icon from './Icon'
import { signOut } from 'next-auth/react'

type LogoutProps = {
  className?: string
}

const Logout: React.FC<LogoutProps> = ({ className }) => {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/login'
    })
  }
  return (
    <Button
      variant="secondary"
      onClick={handleLogout}
      className={cn('flex items-center gap-2', className)}
    >
      <Icon name="log-out" />
    </Button>
  )
}

export default Logout
