'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ErrorImage from '@/assets/404.png'
type ErrorProps = {
  className?: string
  error: Error & { digest?: string }
  reset: () => void
}

const Error: React.FC<ErrorProps> = ({ error, reset, className }) => {
  const { push } = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section
      className={cn(
        'w-full h-full flex flex-col gap-4 items-center justify-center',
        className
      )}
    >
      <Image
        priority
        src={ErrorImage}
        alt="Error robot"
        placeholder="blur"
        width={300}
        height={300}
      />
      <h1 className="text-2xl">Something went wrong</h1>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
      <Button onClick={() => push('/')}>Go back to home</Button>
    </section>
  )
}

export default Error
