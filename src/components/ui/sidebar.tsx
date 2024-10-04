'use client'
import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import React, { useState, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon, { IconName } from '../global/Icon'
import { MenuRoutesType, SingleRouteType } from '@/hooks/useMenuRoutes'

interface Links {
  label: string
  href: string
  icon: IconName
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <>
      <motion.div
        className={cn(
          'h-full py-4 px-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0',
          className
        )}
        animate={{
          width: animate ? (open ? '300px' : '80px') : '300px'
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-background/20 dark:bg-background/20 w-full'
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <Icon
            name="menu"
            size={24}
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
              }}
              className={cn(
                'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <Icon name="menu" size={24} className="cursor-pointer" />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const MultipleSidebarLink = ({
  link: { href, icon, label, active, items },
  className,
  ...props
}: {
  link: MenuRoutesType
  className?: string
  props?: LinkProps
}) => {
  const { open, animate } = useSidebar()

  return (
    <section className="flex flex-col gap-2">
      <div
        className={cn(
          'flex items-center justify-start gap-2 group/sidebar py-2 rounded-lg px-[15px] h-10 relative',
          className,
          active &&
            'bg-stone-700/10 dark:bg-neutral-700/30 border border-border/5 dark:border-border/20 cursor-default'
        )}
        {...props}
      >
        <Icon
          name={icon}
          strokeWidth={active ? 2.6 : 1.6}
          className="min-w-4"
        />

        <motion.span
          animate={{
            display: animate
              ? open
                ? 'inline-block'
                : 'none'
              : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1
          }}
          className={cn(
            'text-neutral-700 dark:text-neutral-200 text-sm  transition duration-150 whitespace-pre inline-block !p-0 !m-0',
            active && 'font-semibold'
          )}
        >
          {label}
        </motion.span>
        {active && (
          <div className="absolute top-0 right-[-16px] h-full bg-primary w-[3px] rounded-l-md"></div>
        )}
      </div>

      <motion.ul
        animate={{
          display: animate ? (open ? 'flex' : 'none') : 'flex',
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className={cn('flex flex-col gap-2 pl-10 relative py-1', active && '')}
      >
        <div className="absolute h-full w-[2px] bg-border top-0 left-5 rounded-lg"></div>
        {items?.map(({ label, href, active, icon }) => {
          return (
            <Link
              href={href}
              key={href}
              className="relative flex items-center justify-start gap-2 group/sidebar py-2 rounded-lg h-10"
            >
              {active && (
                <div className="absolute top-1/2 -left-[23px] -translate-y-1/2 w-2 h-2 bg-green-900 rounded-full shadow-[0_0_8px_3px_rgba(5,150,105,0.3)]"></div>
              )}
              <Icon
                name={icon}
                strokeWidth={active ? 2.6 : 1.6}
                className="min-w-4"
              />

              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? 'inline-block'
                      : 'none'
                    : 'inline-block',
                  opacity: animate ? (open ? 1 : 0) : 1
                }}
                className={cn(
                  'text-neutral-700 dark:text-neutral-200 text-sm  transition duration-150 whitespace-pre inline-block !p-0 !m-0',
                  active && 'font-semibold',
                  !active && 'group-hover/sidebar:translate-x-1'
                )}
              >
                {label}
              </motion.span>
            </Link>
          )
        })}
      </motion.ul>
    </section>
  )
}

export const SidebarLink = ({
  link: { href, icon, label, active, count, disabled = false },
  className,
  ...props
}: {
  link: SingleRouteType
  className?: string
  props?: LinkProps
}) => {
  const { open, animate } = useSidebar()
  if (disabled) return null
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-start gap-2 group/sidebar py-2 rounded-lg px-[15px] h-10 relative',
        className,
        active &&
          'bg-stone-700/10 dark:bg-neutral-700/30 border border-border/5 dark:border-border/20 cursor-default'
      )}
      {...props}
    >
      <div className="relative">
        <Icon
          name={icon}
          strokeWidth={active ? 2.6 : 1.6}
          className="min-w-4"
        />
        {count && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </div>

      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className={cn(
          'text-neutral-700 dark:text-neutral-200 text-sm  transition duration-150 whitespace-pre inline-block !p-0 !m-0',
          active && 'font-semibold',
          !active && 'group-hover/sidebar:translate-x-1'
        )}
      >
        {label}
      </motion.span>
      {active && (
        <div className="absolute top-0 right-[-16px] h-full bg-primary w-[3px] rounded-l-md"></div>
      )}
    </Link>
  )
}
