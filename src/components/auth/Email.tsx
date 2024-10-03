import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormControl, FormDescription, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '../ui/input'

type EmailProps = {
   className?: string
   name?: string
   label?: string
   placeholder?: string
   description?: string
   displayDescription?: boolean
}

const Email: React.FC<EmailProps> = ({
   className,
   name = 'email',
   label = 'Email',
   placeholder = 'Email',
   description = 'Enter your email address',
   displayDescription = true,
}) => {
   const { control } = useFormContext()
   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className={cn('w-full relative', className)}>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input placeholder={placeholder} {...field} />
               </FormControl>
               {displayDescription && <FormDescription>{description}</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default Email
