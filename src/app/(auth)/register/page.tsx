'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
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
import { useAuthControllerRegister } from '@/app/api/generated/auth/auth'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z
  .object({
    email,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    adminSecretKey: z.string().optional()
  })
  .superRefine(({ password, confirmPassword }, { addIssue }) => {
    if (password !== confirmPassword) {
      addIssue({
        message: 'Passwords needs to be equal',
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom
      })
    }
  })

const Page = () => {
  const { push } = useRouter()
  useRedirectIfLogin()
  const { mutate, isPending } = useAuthControllerRegister()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      adminSecretKey: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(
      {
        data
      },
      {
        onSuccess: () => {
          toast.success('Registered successfully')
          push('/login')
        },
        onError: (error: any) => {
          toast.error(error?.message || 'An error occurred')
        }
      }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 min-w-[400px] sm:min-w-[500px] max-w-xl bg-background/60  dark:bg-background/30 backdrop-blur-sm p-8 sm:p-12 rounded-xl border border-border/20 dark:border-border/80 z-50"
      >
        <section className="flex flex-col items-center justify-center gap-2">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 dark:from-neutral-200 to-neutral-600 dark:to-neutral-500">
              Sign up
            </h1>
            <Logo />
          </div>
          <p className="text-gray-400">Sign up to access all features</p>
        </section>
        <Email />
        <Password />
        <Password
          name="confirmPassword"
          label="Confirm password"
          description="Confirm your password"
          placeholder="Confirm password"
        />
        <FormField
          control={form.control}
          name="adminSecretKey"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value !== ''}
                  onCheckedChange={(checked) => {
                    form.setValue('adminSecretKey', checked ? 'password' : '')
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Become an admin
                  <span className="text-xs text-gray-400 ml-1">(optional)</span>
                </FormLabel>
                <FormDescription>
                  With one click you can become an admin and access all features
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-6 text-base flex items-center gap-2"
        >
          Sign up
          <IconLoad isLoading={isPending}>
            <Send size={18} className="text-white" />
          </IconLoad>
        </Button>
        <div className="flex items-center gap-1">
          <p>Don't have an account?</p>
          <Link
            href="/login"
            className="text-indigo-500 hover:underline hover:text-indigo-400 transition-all"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default Page
