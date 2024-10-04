import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import ErrorImage from '@/assets/404.png'

const NotFound = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
      <Image
        priority
        src={ErrorImage}
        alt="Error robot"
        placeholder="blur"
        width={300}
        height={300}
      />
      <h1 className="sm:text-3xl text-xl font-bold">Page not found</h1>
      <Link href="/">
        <Button size="lg">Go back to home</Button>
      </Link>
    </section>
  )
}

export default NotFound
