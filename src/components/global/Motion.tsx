'use client'

import { motion, MotionProps } from 'framer-motion'

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements> extends MotionProps {
   type?: Tag
   children: React.ReactNode
   className?: string
}

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
   type,
   children,
   className,

   ...props
}: CustomMotionProps<Tag>) => {
   const Component: React.ElementType = type ? motion[type as keyof typeof motion] : motion.div

   return (
      <Component className={className} {...props}>
         {children}
      </Component>
   )
}
