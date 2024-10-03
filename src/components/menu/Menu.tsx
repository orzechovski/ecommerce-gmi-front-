'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  MultipleSidebarLink,
  Sidebar,
  SidebarBody,
  SidebarLink
} from '../ui/sidebar'
import MenuLogo from './MenuLogo'
import User from './User'
import Logout from '../global/Logout'
import ThemeSwitch from '../global/ThemeSwitch'
import useMenuRoutes from '@/hooks/useMenuRoutes'

type MenuProps = {
  className?: string
  containerClassName?: string
  children?: React.ReactNode
}

const Menu: React.FC<MenuProps> = ({
  className,
  containerClassName,
  children
}) => {
  const links = useMenuRoutes()

  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row w-full flex-1 overflow-hidden h-full',
        className
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-background/40 dark:bg-background/40 md:backdrop-blur-lg backdrop-blur-md">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-4">
              <MenuLogo open={open} />
              <User open={open} />
            </div>
            <div className="border-b pt-6"></div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) =>
                link.items ? (
                  <MultipleSidebarLink key={idx} link={link} />
                ) : (
                  <SidebarLink key={idx} link={link} />
                )
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-2">
            <Logout className="w-full" />
            <ThemeSwitch className="w-full" />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className={cn('flex-1', containerClassName)}>{children}</main>
    </div>
  )
}

export default Menu
