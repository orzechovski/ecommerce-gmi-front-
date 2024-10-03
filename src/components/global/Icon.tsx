'use client'
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { memo } from 'react'

export type IconName = keyof typeof dynamicIconImports

interface IconProps extends LucideProps {
   name: IconName
}

const Icon = ({ name, ...props }: IconProps) => {
   const LucideIcon = dynamic(dynamicIconImports[name])

   return <LucideIcon strokeWidth={1.6} size={18} {...props} />
}

export default memo(Icon)
