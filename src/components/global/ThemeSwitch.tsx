'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

type ThemeSwitchProps = {
   className?: string
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
   const [isClient, setIsClient] = useState(false)
   const { setTheme, resolvedTheme } = useTheme()
   const isDark = resolvedTheme === 'dark'

   useEffect(() => {
      setIsClient(true)
   }, [])

   return (
      isClient && (
         <Button variant="secondary" className={cn(className)} onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
         </Button>
      )
   )
}

export default ThemeSwitch
