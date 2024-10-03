'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { email, passwordSchema } from '@/components/auth/schemas'
import Email from '@/components/auth/Email'
import Password from '@/components/auth/Password'
import IconLoad from '@/components/global/IconLoad'
import { Send } from 'lucide-react'
import Logo from '@/components/global/Logo'
import useRedirectIfLogin from '@/hooks/useRedirectIfLogin'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email,
  password: passwordSchema
})

const Page = () => {
  const { push } = useRouter()
  useRedirectIfLogin()

  const { mutate: login, isPending } = useMutation<
    void,
    string,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      if (res?.error) {
        throw new Error(res.error)
      }
    }
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    login(data, {
      onSuccess: () => {
        toast.success('Logged in successfully')
        push('/')
      },
      onError: (error: string) => {
        toast.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 min-w-[400px] sm:min-w-[460px] max-w-xl bg-background/60  dark:bg-background/30 backdrop-blur-sm p-8 sm:p-12 rounded-xl border border-border/20 dark:border-border/80 z-50"
      >
        <section className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 dark:from-neutral-200 to-neutral-600 dark:to-neutral-500">
              Sign in
            </h1>
            <Logo />
          </div>
          <p className="text-gray-400">Sign in to your account</p>
        </section>
        <Email />
        <Password />
        <Button
          type="submit"
          className="mt-6 text-base flex items-center gap-2"
        >
          Sign in
          <IconLoad isLoading={isPending}>
            <Send size={18} />
          </IconLoad>
        </Button>
      </form>
    </Form>
  )
}

export default Page
